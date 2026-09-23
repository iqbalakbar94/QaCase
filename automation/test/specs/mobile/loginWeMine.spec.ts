import { expect } from '@wdio/globals';
import LoginPage, { LoginCredentials } from '../../pageobjects/mobile/loginWeMine.page';

describe('Login', () => {
    let currentUserData: LoginCredentials;

    beforeEach(async () => {
        const fixtureData = await import(`../../fixtures/${process.env.ENV_NAME}/mobile/loginWeMineData.json`);
        currentUserData = { ...fixtureData.validUser };
    });

    describe('Positive Case - Login', () => {
        it('TC-MSI-001 : [Positive] Masuk aplikasi dengan user yang valid', async () => {
            await LoginPage.login(currentUserData);
        })
    })

    describe('Negative Case - Login', () => {
        it('TC-MSI-002 : [Negative] Masuk aplikasi dengan user yang tidak terdaftar', async () => {
            currentUserData.username = 'johndoeinvalid';

            await LoginPage.submitUsername(currentUserData);

            await expect(LoginPage.errorUsername).toHaveText('Account is not registered');
        });

        it('TC-MSI-003 : [Negative] Masuk aplikasi dengan password yang salah', async () => {
            currentUserData.password = 'PasswordInvalid1!';

            await LoginPage.login(currentUserData);

            await expect(LoginPage.errorMsPassword).toHaveText('That password is incorrect for your Microsoft account.');
        });

        it('TC-MSI-004 : [Negative] Masuk aplikasi dengan username kosong', async () => {
            currentUserData.username = '';

            await LoginPage.submitUsername(currentUserData);

            await expect(LoginPage.errorUsername).toHaveText('Please enter a valid username');
        });

        it('TC-MSI-005 : [Negative] Masuk aplikasi dengan password kosong', async () => {
            currentUserData.password = '';

            await LoginPage.login(currentUserData);

            await expect(LoginPage.errorMsPassword).toHaveText('Enter the password for your Microsoft account.');
        });
    });
});