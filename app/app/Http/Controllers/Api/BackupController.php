<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Process\Process;
use ZipArchive;

class BackupController extends Controller
{
    public function downloadFullBackup(Request $request): BinaryFileResponse|JsonResponse
    {
        $user = $request->user();

        if (! $user || ! $user->isAdministrator()) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $timestamp = now()->format('Ymd-His');
        $backupDir = storage_path('app/backups');
        $sqlPath = $backupDir."/db-{$timestamp}.sql";
        $zipPath = $backupDir."/parishhub-backup-{$timestamp}.zip";

        if (! is_dir($backupDir)) {
            mkdir($backupDir, 0755, true);
        }

        $connectionName = config('database.default');
        $connection = config("database.connections.{$connectionName}");

        if (! is_array($connection) || ($connection['driver'] ?? null) !== 'mysql') {
            return response()->json([
                'message' => 'Full backup currently supports only MySQL connections.',
            ], 422);
        }

        $dbHost = (string) ($connection['host'] ?? '127.0.0.1');
        $dbPort = (string) ($connection['port'] ?? '3306');
        $dbDatabase = (string) ($connection['database'] ?? '');
        $dbUsername = (string) ($connection['username'] ?? '');
        $dbPassword = (string) ($connection['password'] ?? '');

        if ($dbDatabase === '' || $dbUsername === '') {
            return response()->json([
                'message' => 'Database credentials are not configured correctly.',
            ], 500);
        }

        // Ensure DB connection is available before dump.
        DB::connection()->getPdo();

        $command = [
            'mysqldump',
            "--host={$dbHost}",
            "--port={$dbPort}",
            "--user={$dbUsername}",
            "--password={$dbPassword}",
            '--single-transaction',
            '--routines',
            '--triggers',
            '--result-file='.$sqlPath,
            $dbDatabase,
        ];

        $process = new Process($command, base_path());
        $process->setTimeout(300);
        $process->run();

        if (! $process->isSuccessful() || ! file_exists($sqlPath)) {
            return response()->json([
                'message' => 'Database backup failed.',
                'details' => trim($process->getErrorOutput()) ?: trim($process->getOutput()),
            ], 500);
        }

        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            @unlink($sqlPath);

            return response()->json([
                'message' => 'Could not create backup archive.',
            ], 500);
        }

        $zip->addFile($sqlPath, 'database.sql');

        // $this->addPathToZip(base_path('app'), $zip, 'app');
        // $this->addPathToZip(base_path('bootstrap'), $zip, 'bootstrap');
        // $this->addPathToZip(base_path('config'), $zip, 'config');
        // $this->addPathToZip(base_path('database/migrations'), $zip, 'database/migrations');
        // $this->addPathToZip(base_path('public'), $zip, 'public');
        // $this->addPathToZip(base_path('resources'), $zip, 'resources');
        // $this->addPathToZip(base_path('routes'), $zip, 'routes');
        // $this->addPathToZip(storage_path('app/public'), $zip, 'storage/app/public');

        // if (file_exists(base_path('.env'))) {
        //     $zip->addFile(base_path('.env'), '.env');
        // }

        // if (file_exists(base_path('composer.json'))) {
        //     $zip->addFile(base_path('composer.json'), 'composer.json');
        // }

        // if (file_exists(base_path('composer.lock'))) {
        //     $zip->addFile(base_path('composer.lock'), 'composer.lock');
        // }

        // if (file_exists(base_path('package.json'))) {
        //     $zip->addFile(base_path('package.json'), 'package.json');
        // }

        // if (file_exists(base_path('docker-compose.yml'))) {
        //     $zip->addFile(base_path('docker-compose.yml'), 'docker-compose.yml');
        // }

        $zip->close();
        @unlink($sqlPath);

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    private function addPathToZip(string $path, ZipArchive $zip, string $zipRoot): void
    {
        if (! file_exists($path)) {
            return;
        }

        if (is_file($path)) {
            $zip->addFile($path, $zipRoot);
            return;
        }

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($iterator as $file) {
            if (! $file->isFile()) {
                continue;
            }

            $realPath = $file->getRealPath();
            if ($realPath === false) {
                continue;
            }

            $relativePath = ltrim(str_replace($path, '', $realPath), DIRECTORY_SEPARATOR);
            $zipPath = $zipRoot.'/'.str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            $zip->addFile($realPath, $zipPath);
        }
    }
}
