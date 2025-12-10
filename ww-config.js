const INFO = {
    submit: 'sub',
    reset: 'rst',
    button: 'btn',
};

export default {
    inherit: 'ww-text',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex'],
        linkable: true,
    },
    editor: {
        label: {
            en: 'Button',
            fr: 'Bouton',
        },
        icon: 'cursor-click',
        infoTags: content => {
            if (content.buttonType && INFO[content.buttonType]) {
                return {
                    color: 'var(--ww-color-blue-500)',
                    backgroundColor: 'var(--ww-color-blue-100)',
                    text: INFO[content.buttonType].toUpperCase(),
                    action: () => {
                        wwLib.wwSearchBar.executeAction({
                            actions: wwLib.wwSearchBar.getEditSidebarActions('settings', 'custom-0'),
                        });
                    },
                };
            } else {
                return [];
            }
        },
        workflowHint: content => {
            if (content.buttonType !== 'submit') {
                return false;
            }

            return {
                type: 'warning',
                header: {
                    en: 'You probably shouldn’t trigger workflows on submit buttons.',
                    fr: 'Vous ne devriez pas déclencher un workflow depuis un bouton submit',
                },
                text: {
                    en: 'For your users to benefit from automatic form field validation, you should trigger submit workflows on the form container. Unless you are 100% sure of what you’re doing and want to bypass this behavior.',
                    fr: 'Pour que vos utilisateurs bénéficient de la validation automatique des champs de formulaire, vous devez déclencher des workflows de soumission sur le conteneur de formulaire. À moins que vous ne soyez sûr à 100 % de ce que vous faites et que vous souhaitiez contourner ce comportement.',
                },
                button: {
                    text: { en: 'Select form container', fr: 'Selectionnez le form container' },
                    action: 'selectParentFormContainer',
                },
            };
        },
    },
    states: ['focus', 'disabled', 'active'],
    triggerEvents: [
        { name: 'focus', label: { en: 'On focus' }, event: null },
        { name: 'blur', label: { en: 'On blur' }, event: null },
        { name: 'keydown', label: { en: 'On key down' }, event: null },
        { name: 'keyup', label: { en: 'On key up' }, event: null },
    ],
    properties: {
        daisyTheme: {
            label: { en: 'DaisyUI Theme', fr: 'Thème DaisyUI' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'cupcake', label: 'Cupcake' },
                    { value: 'bumblebee', label: 'Bumblebee' },
                    { value: 'emerald', label: 'Emerald' },
                    { value: 'corporate', label: 'Corporate' },
                    { value: 'synthwave', label: 'Synthwave' },
                    { value: 'retro', label: 'Retro' },
                    { value: 'cyberpunk', label: 'Cyberpunk' },
                    { value: 'valentine', label: 'Valentine' },
                    { value: 'halloween', label: 'Halloween' },
                    { value: 'garden', label: 'Garden' },
                    { value: 'forest', label: 'Forest' },
                    { value: 'aqua', label: 'Aqua' },
                    { value: 'lofi', label: 'Lo-Fi' },
                    { value: 'pastel', label: 'Pastel' },
                    { value: 'fantasy', label: 'Fantasy' },
                    { value: 'wireframe', label: 'Wireframe' },
                    { value: 'black', label: 'Black' },
                    { value: 'luxury', label: 'Luxury' },
                    { value: 'dracula', label: 'Dracula' },
                    { value: 'cmyk', label: 'CMYK' },
                    { value: 'autumn', label: 'Autumn' },
                    { value: 'business', label: 'Business' },
                    { value: 'acid', label: 'Acid' },
                    { value: 'lemonade', label: 'Lemonade' },
                    { value: 'night', label: 'Night' },
                    { value: 'coffee', label: 'Coffee' },
                    { value: 'winter', label: 'Winter' },
                ],
            },
            defaultValue: 'light',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the DaisyUI theme name',
            },
            propertyHelp: 'Select a built-in DaisyUI theme or bind a custom theme object',
            /* wwEditor:end */
        },
        customTheme: {
            label: { en: 'Custom Theme (overrides theme selection)', fr: 'Thème personnalisé (remplace la sélection)' },
            type: 'Object',
            section: 'settings',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'object',
                tooltip: 'An object containing DaisyUI theme color variables',
            },
            propertyHelp: 'Bind a WeWeb variable with custom theme colors. When bound, this overrides the theme selection.',
            /* wwEditor:end */
        },
        daisyColorVariant: {
            label: { en: 'Color Variant', fr: 'Variante de couleur' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'accent', label: 'Accent' },
                    { value: 'neutral', label: 'Neutral' },
                    { value: 'info', label: 'Info' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'error', label: 'Error' },
                    { value: 'ghost', label: 'Ghost' },
                ],
            },
            defaultValue: 'primary',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color variant: primary | secondary | accent | neutral | info | success | warning | error | ghost',
            },
            /* wwEditor:end */
        },
        daisySize: {
            label: { en: 'Button Size', fr: 'Taille du bouton' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'xs', label: 'Extra Small' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            defaultValue: 'md',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Button size: xs | sm | md | lg',
            },
            /* wwEditor:end */
        },
        daisyStyle: {
            label: { en: 'Button Style', fr: 'Style du bouton' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'solid', label: 'Solid' },
                    { value: 'outline', label: 'Outline' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'glass', label: 'Glass' },
                    { value: 'link', label: 'Link' },
                ],
            },
            defaultValue: 'solid',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Button style: solid | outline | ghost | glass | link',
            },
            /* wwEditor:end */
        },
        daisyRounded: {
            label: { en: 'Border Radius', fr: 'Arrondi des bords' },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'full', label: 'Full' },
                ],
            },
            defaultValue: 'md',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border radius: none | sm | md | lg | full',
            },
            /* wwEditor:end */
        },
        daisyShadow: {
            label: { en: 'Shadow', fr: 'Ombre' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Enable shadow effect',
            },
            /* wwEditor:end */
        },
        daisyAnimation: {
            label: { en: 'Animation on Click', fr: 'Animation au clic' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Enable click animation effect',
            },
            /* wwEditor:end */
        },
        backgroundColor: {
            label: {
                en: 'Text Background',
                fr: 'Background du Texte',
            },
            type: 'Color',
            options: {
                nullable: true,
            },
            bindable: true,
            responsive: true,
            states: true,
            classes: true,
            /* wwEditor:start */
            bindingValidation: {
                cssSupports: 'color',
                type: 'string',
                tooltip: 'A string that represents a color code: `"rebeccapurple" | "#00ff00" | "rgb(214, 122, 127)"`',
            },
            /* wwEditor:end */
        },
        buttonType: {
            label: {
                en: 'Type',
                fr: 'Type',
            },
            type: 'TextSelect',
            section: 'settings',
            options: {
                options: [
                    { value: null, label: 'none' },
                    { value: 'button', label: 'Button' },
                    { value: 'submit', label: 'Submit Button' },
                ],
            },
            defaultValue: 'button',
            bindable: true,
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the button type: `"button" | "submit"`',
            },
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the button is disabled: `true | false`',
            },
            /* wwEditor:end */
        },
        hasLeftIcon: {
            label: { en: 'Left icon', fr: 'Icône gauche' },
            section: 'settings',
            type: 'OnOff',
        },
        leftIcon: {
            hidden: true,
            isArray: false,
        },
        hasRightIcon: {
            label: { en: 'Right icon', fr: 'Icône droite' },
            type: 'OnOff',
            section: 'settings',
        },
        rightIcon: {
            hidden: true,
            isArray: false,
        },
    },
};
