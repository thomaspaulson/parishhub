<?php

namespace Tests\Feature;

use App\Models\Death;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeathApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_deaths(): void
    {
        $response = $this->getJson('/api/deaths');

        $response->assertOk();
        $response->assertJsonStructure([
            'data',
            'links',
            'meta',
        ]);
    }

    public function test_can_crud_death(): void
    {
        $createResponse = $this->postJson('/api/deaths', [
            'full_name' => 'John Doe',
            'reg_no' => 'REG-001',
            'date_of_death' => '2025-01-10',
        ]);

        $createResponse->assertCreated();
        $deathId = $createResponse->json('id');

        $this->assertNotNull($deathId);

        $this->getJson("/api/deaths/{$deathId}")
            ->assertOk()
            ->assertJsonFragment([
                'id' => $deathId,
                'full_name' => 'John Doe',
                'reg_no' => 'REG-001',
            ]);

        $this->patchJson("/api/deaths/{$deathId}", [
            'address' => '123 Main St',
        ])->assertOk()
            ->assertJsonFragment([
                'id' => $deathId,
                'address' => '123 Main St',
            ]);

        $this->deleteJson("/api/deaths/{$deathId}")
            ->assertNoContent();

        $this->getJson("/api/deaths/{$deathId}")
            ->assertNotFound();

        $this->assertDatabaseMissing(Death::class, [
            'id' => $deathId,
        ]);
    }
}
