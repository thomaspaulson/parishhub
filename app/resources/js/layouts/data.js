export const features = [
    {
        title: 'Record Management',
        description:
            'Capture births, marriages, and deaths with guided forms, validations, and audit trails.',
    },
    {
        title: 'Secure Access',
        description:
            'Role-based permissions, activity logs, and secure data storage for sensitive records.',
    },
    {
        title: 'Insights & Reports',
        description:
            'Generate monthly summaries and exportable reports for compliance and planning.',
    },
];

export const stats = [
    { label: 'Parishes connected', value: '128' },
    { label: 'Records digitized', value: '1.2M' },
    { label: 'Avg. time saved', value: '32%' },
];

export const steps = [
    {
        step: '01',
        title: 'Sign in & configure',
        description: 'Create your parish profile, upload your logo, and define record types.',
    },
    {
        step: '02',
        title: 'Invite your team',
        description: 'Assign roles for administrators, registrars, and reviewers in minutes.',
    },
    {
        step: '03',
        title: 'Start registering',
        description: 'Use smart forms with auto-suggestions to speed up every entry.',
    },
];

export const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Login', to: '/login' },
    { label: 'Records', to: '/records' },
    { label: 'Insights', to: '/insights' },
];

export const adminNavItems = [
    { label: 'Dashboard', to: '/admin' },
    { label: 'Deaths', to: '/admin/deaths' },
    { label: 'Births', to: '/admin/births' },
    { label: 'Marriages', to: '/admin/marriages' },
    { label: 'Settings', to: '/admin/settings' },
];
