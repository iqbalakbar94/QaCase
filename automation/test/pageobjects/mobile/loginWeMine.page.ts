import { $ } from '@wdio/globals';

// === Data Types ===
export interface LoginCredentials {
    username?: string;
    password?: string;
}

class LoginPage {
    // === Private Locators ===
    private get inputUsername() { return $('~input-username'); }
    private get btnNext() { return $('~btn-next'); }
    private get inputMsPassword() { return $('#passwordEntry'); }
    private get btnMsNext() { return $('[data-testid="primaryButton"]'); }
    private get usernameErrorMessage() { return $('~username-error'); }
    private get passwordErrorMessage() { return $('#passwordError'); }

    // === Action Methods ===
    public async submitUsername(data: LoginCredentials): Promise<void> {
        if (data.username !== undefined) {
            await this.inputUsername.setValue(data.username);
        }

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await this.btnNext.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Element was not displayed within 5 seconds'
        });
        await this.btnNext.click();
    }

    public async submitPassword(data: LoginCredentials): Promise<void> {
        if (data.password !== undefined) {
            await this.inputMsPassword.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Element was not displayed within 5 seconds'
            });
            await this.inputMsPassword.setValue(data.password);
        }

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await this.btnMsNext.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Element was not displayed within 5 seconds'
        });
        await this.btnMsNext.click();
    }

    public async login(data: LoginCredentials): Promise<void> {
        await this.submitUsername(data);
        await this.submitPassword(data);
    }

    // === Assertion ===
    public get errorUsername() { return this.usernameErrorMessage; }
    public get errorMsPassword() { return this.passwordErrorMessage; }
}

export default new LoginPage();