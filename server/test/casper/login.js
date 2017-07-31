/* eslint-disable */
casper.options.viewportSize = { width: 950, height: 950 };

casper.test.begin('After creating user -> profile must contain h1 with text "To do !!!"', 1, function suite(test) {
    casper.start("http://localhost:3000/", function() {
        casper.echo('--------------------');
        test.assertExists('div.container-fluid');
        test.assertExists('button.nav-btn');
        casper.capture('screenshots/register_1.png');
        casper.waitForSelector("button.nav-btn").thenClick("button.nav-btn");
    })
    .then(function() {
        casper.capture('screenshots/register_2.png');
        test.assertExists('input[name=name]');
        casper.sendKeys('input[name=name]', 'Gosho');
        casper.sendKeys('input[name=username]', 'GoshoUsername14');
        casper.sendKeys('input[name=email]', 'gosho@gmail.com');
        casper.sendKeys('input[name=password]', 'gosho123');
        casper.sendKeys('input[name=confirm]', 'gosho123');
    })
    .then(function() {
        casper.capture('screenshots/register_3.png');
        test.assertExists('button.btn-success');
        casper.waitForSelector('button.btn-success').thenClick('button.btn-success');
    })
    .then(function() {
        casper.capture('screenshots/register_4.png');
        test.assertExists('button.auth-btn')
        casper.waitForSelector('button.auth-btn').thenClick('button.auth-btn');
    })
    .then(function() {
        casper.capture('screenshots/register_5.png');
        test.assertUrlMatch('http://localhost:3000/auth/use');

        const expectedH1Text = 'To do!!!';
        // const h1Text = casper.fetchText("h1");
        test.assertSelectorHasText('h1', expectedH1Text);
    })
    .run(function() {
        // casper.capture('screenshots/register_4.png');
        test.done();
    });
});
