define([], function()
{
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/app/modules/welcome.view.html',
                dependencies: [
                    'modules/welcome.controller'
                ]
            },
            '/view1': {
                templateUrl: '/app/modules/view1.view.html',
                dependencies: [
                    'modules/view1.controller'
                ]
            },
        }
    };
});
