<template>
    <component
        :is="tag"
        class="ww-button"
        :class="[{ button: tag, '-link': hasLink && !isEditing, active: isActive }, daisyClasses]"
        :type="buttonType"
        :style="buttonStyle"
        :data-ww-flag="'btn-' + content.buttonType"
        :disabled="content.disabled"
        v-bind="properties"
        @focus="isReallyFocused = true"
        @blur="onBlur($event)"
        @mousedown="onMouseActivate"
        @mouseup="onMouseDeactivate"
        @mouseleave="onMouseDeactivate"
        @touchstart="onTouchActivate"
        @touchend="onTouchDeactivate"
        @touchcancel="onTouchDeactivate"
        @keydown.enter="onKeyActivate"
        @keydown.space="onKeyActivate"
        @keyup.enter="onKeyDeactivate"
        @keyup.space="onKeyDeactivate"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
    >
        <wwElement v-if="content.hasLeftIcon && content.leftIcon" v-bind="content.leftIcon"></wwElement>
        <wwText tag="span" :text="text"></wwText>
        <wwElement v-if="content.hasRightIcon && content.rightIcon" v-bind="content.rightIcon"></wwElement>
    </component>
</template>

<script>
import { computed } from 'vue';
const TEXT_ALIGN_TO_JUSTIFY = {
    center: 'center',
    right: 'flex-end',
    left: 'flex-start',
    justify: 'center',
};

// DaisyUI Theme Definitions
const DAISY_THEMES = {
    light: {
        primary: '259 94% 51%',
        primaryFocus: '259 94% 41%',
        primaryContent: '0 0% 100%',
        secondary: '314 100% 47%',
        secondaryFocus: '314 100% 37%',
        secondaryContent: '0 0% 100%',
        accent: '174 60% 51%',
        accentFocus: '174 60% 41%',
        accentContent: '0 0% 100%',
        neutral: '219 14% 28%',
        neutralFocus: '219 14% 18%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '0 0% 95%',
        base300: '0 0% 87%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    dark: {
        primary: '262 80% 50%',
        primaryFocus: '262 80% 40%',
        primaryContent: '0 0% 100%',
        secondary: '180 100% 10%',
        secondaryFocus: '180 100% 8%',
        secondaryContent: '0 0% 100%',
        accent: '174 60% 51%',
        accentFocus: '174 60% 41%',
        accentContent: '0 0% 100%',
        neutral: '219 20% 20%',
        neutralFocus: '219 20% 15%',
        neutralContent: '0 0% 90%',
        base100: '220 18% 20%',
        base200: '220 17% 17%',
        base300: '220 16% 14%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    cupcake: {
        primary: '189 94% 43%',
        primaryFocus: '189 94% 33%',
        primaryContent: '0 0% 100%',
        secondary: '276 58% 52%',
        secondaryFocus: '276 58% 42%',
        secondaryContent: '0 0% 100%',
        accent: '36 95% 90%',
        accentFocus: '36 95% 80%',
        accentContent: '36 55% 15%',
        neutral: '218 23% 23%',
        neutralFocus: '218 23% 18%',
        neutralContent: '0 0% 100%',
        base100: '25 95% 97%',
        base200: '23 92% 91%',
        base300: '24 89% 85%',
        baseContent: '0 0% 20%',
        info: '207 90% 54%',
        infoContent: '0 0% 100%',
        success: '174 60% 51%',
        successContent: '0 0% 100%',
        warning: '36 100% 50%',
        warningContent: '0 0% 100%',
        error: '14 100% 57%',
        errorContent: '0 0% 100%',
    },
    bumblebee: {
        primary: '45 100% 51%',
        primaryFocus: '45 100% 41%',
        primaryContent: '45 60% 11%',
        secondary: '180 78% 26%',
        secondaryFocus: '180 78% 21%',
        secondaryContent: '0 0% 100%',
        accent: '0 59% 41%',
        accentFocus: '0 59% 31%',
        accentContent: '0 0% 100%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '44 58% 93%',
        base300: '44 50% 83%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    emerald: {
        primary: '142 76% 36%',
        primaryFocus: '142 76% 26%',
        primaryContent: '0 0% 100%',
        secondary: '219 96% 48%',
        secondaryFocus: '219 96% 38%',
        secondaryContent: '0 0% 100%',
        accent: '329 86% 70%',
        accentFocus: '329 86% 60%',
        accentContent: '329 40% 15%',
        neutral: '0 0% 18%',
        neutralFocus: '0 0% 14%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '0 0% 96%',
        base300: '0 0% 88%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    corporate: {
        primary: '230 62% 56%',
        primaryFocus: '230 62% 46%',
        primaryContent: '0 0% 100%',
        secondary: '262 52% 47%',
        secondaryFocus: '262 52% 37%',
        secondaryContent: '0 0% 100%',
        accent: '199 98% 48%',
        accentFocus: '199 98% 38%',
        accentContent: '0 0% 100%',
        neutral: '214 20% 21%',
        neutralFocus: '214 20% 16%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '220 13% 95%',
        base300: '216 12% 84%',
        baseContent: '218 18% 12%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    synthwave: {
        primary: '321 70% 52%',
        primaryFocus: '321 70% 42%',
        primaryContent: '0 0% 100%',
        secondary: '280 89% 64%',
        secondaryFocus: '280 89% 54%',
        secondaryContent: '0 0% 100%',
        accent: '48 89% 54%',
        accentFocus: '48 89% 44%',
        accentContent: '0 0% 100%',
        neutral: '254 15% 20%',
        neutralFocus: '254 15% 15%',
        neutralContent: '0 0% 100%',
        base100: '258 28% 15%',
        base200: '257 21% 13%',
        base300: '256 22% 11%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    retro: {
        primary: '3 74% 66%',
        primaryFocus: '3 74% 56%',
        primaryContent: '3 30% 15%',
        secondary: '168 52% 63%',
        secondaryFocus: '168 52% 53%',
        secondaryContent: '168 30% 15%',
        accent: '41 57% 68%',
        accentFocus: '41 57% 58%',
        accentContent: '41 30% 15%',
        neutral: '38 22% 27%',
        neutralFocus: '38 22% 22%',
        neutralContent: '38 22% 87%',
        base100: '43 31% 87%',
        base200: '42 29% 77%',
        base300: '42 28% 67%',
        baseContent: '43 31% 17%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    cyberpunk: {
        primary: '345 100% 47%',
        primaryFocus: '345 100% 37%',
        primaryContent: '0 0% 100%',
        secondary: '177 92% 70%',
        secondaryFocus: '177 92% 60%',
        secondaryContent: '177 35% 15%',
        accent: '46 100% 50%',
        accentFocus: '46 100% 40%',
        accentContent: '0 0% 100%',
        neutral: '240 8% 12%',
        neutralFocus: '240 8% 9%',
        neutralContent: '0 0% 100%',
        base100: '60 30% 96%',
        base200: '60 17% 85%',
        base300: '60 9% 74%',
        baseContent: '60 30% 16%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    valentine: {
        primary: '353 74% 62%',
        primaryFocus: '353 74% 52%',
        primaryContent: '0 0% 100%',
        secondary: '314 84% 72%',
        secondaryFocus: '314 84% 62%',
        secondaryContent: '0 0% 100%',
        accent: '187 80% 58%',
        accentFocus: '187 80% 48%',
        accentContent: '0 0% 100%',
        neutral: '294 7% 32%',
        neutralFocus: '294 7% 27%',
        neutralContent: '0 0% 100%',
        base100: '316 73% 95%',
        base200: '315 34% 85%',
        base300: '314 23% 73%',
        baseContent: '335 20% 13%',
        info: '207 90% 54%',
        infoContent: '0 0% 100%',
        success: '174 60% 51%',
        successContent: '0 0% 100%',
        warning: '36 100% 50%',
        warningContent: '0 0% 100%',
        error: '14 100% 57%',
        errorContent: '0 0% 100%',
    },
    halloween: {
        primary: '35 100% 50%',
        primaryFocus: '35 100% 40%',
        primaryContent: '0 0% 100%',
        secondary: '264 80% 50%',
        secondaryFocus: '264 80% 40%',
        secondaryContent: '0 0% 100%',
        accent: '147 50% 47%',
        accentFocus: '147 50% 37%',
        accentContent: '0 0% 100%',
        neutral: '0 0% 10%',
        neutralFocus: '0 0% 7%',
        neutralContent: '0 0% 100%',
        base100: '24 30% 13%',
        base200: '24 23% 11%',
        base300: '24 18% 9%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    garden: {
        primary: '142 52% 51%',
        primaryFocus: '142 52% 41%',
        primaryContent: '0 0% 100%',
        secondary: '219 96% 48%',
        secondaryFocus: '219 96% 38%',
        secondaryContent: '0 0% 100%',
        accent: '329 86% 70%',
        accentFocus: '329 86% 60%',
        accentContent: '329 40% 15%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '151 24% 94%',
        base300: '152 22% 86%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    forest: {
        primary: '141 50% 45%',
        primaryFocus: '141 50% 35%',
        primaryContent: '0 0% 100%',
        secondary: '141 44% 62%',
        secondaryFocus: '141 44% 52%',
        secondaryContent: '141 20% 15%',
        accent: '43 74% 66%',
        accentFocus: '43 74% 56%',
        accentContent: '43 30% 15%',
        neutral: '0 0% 14%',
        neutralFocus: '0 0% 11%',
        neutralContent: '0 0% 100%',
        base100: '151 27% 12%',
        base200: '151 23% 10%',
        base300: '151 20% 8%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    aqua: {
        primary: '185 56% 50%',
        primaryFocus: '185 56% 40%',
        primaryContent: '0 0% 100%',
        secondary: '334 71% 56%',
        secondaryFocus: '334 71% 46%',
        secondaryContent: '0 0% 100%',
        accent: '172 66% 50%',
        accentFocus: '172 66% 40%',
        accentContent: '0 0% 100%',
        neutral: '217 16% 22%',
        neutralFocus: '217 16% 17%',
        neutralContent: '0 0% 100%',
        base100: '202 73% 96%',
        base200: '203 61% 85%',
        base300: '203 48% 74%',
        baseContent: '202 73% 16%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    lofi: {
        primary: '0 0% 0%',
        primaryFocus: '0 0% 0%',
        primaryContent: '0 0% 100%',
        secondary: '0 0% 0%',
        secondaryFocus: '0 0% 0%',
        secondaryContent: '0 0% 100%',
        accent: '0 0% 0%',
        accentFocus: '0 0% 0%',
        accentContent: '0 0% 100%',
        neutral: '0 0% 90%',
        neutralFocus: '0 0% 80%',
        neutralContent: '0 0% 0%',
        base100: '0 0% 100%',
        base200: '0 0% 90%',
        base300: '0 0% 80%',
        baseContent: '0 0% 0%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    pastel: {
        primary: '275 55% 67%',
        primaryFocus: '275 55% 57%',
        primaryContent: '0 0% 100%',
        secondary: '333 58% 67%',
        secondaryFocus: '333 58% 57%',
        secondaryContent: '0 0% 100%',
        accent: '199 76% 69%',
        accentFocus: '199 76% 59%',
        accentContent: '0 0% 100%',
        neutral: '217 14% 35%',
        neutralFocus: '217 14% 30%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '222 14% 95%',
        base300: '221 13% 85%',
        baseContent: '222 14% 15%',
        info: '207 90% 54%',
        infoContent: '0 0% 100%',
        success: '174 60% 51%',
        successContent: '0 0% 100%',
        warning: '36 100% 50%',
        warningContent: '0 0% 100%',
        error: '14 100% 57%',
        errorContent: '0 0% 100%',
    },
    fantasy: {
        primary: '307 78% 40%',
        primaryFocus: '307 78% 30%',
        primaryContent: '0 0% 100%',
        secondary: '219 70% 56%',
        secondaryFocus: '219 70% 46%',
        secondaryContent: '0 0% 100%',
        accent: '30 80% 55%',
        accentFocus: '30 80% 45%',
        accentContent: '0 0% 100%',
        neutral: '230 15% 23%',
        neutralFocus: '230 15% 18%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '307 14% 93%',
        base300: '307 11% 83%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    wireframe: {
        primary: '0 0% 74%',
        primaryFocus: '0 0% 64%',
        primaryContent: '0 0% 0%',
        secondary: '0 0% 74%',
        secondaryFocus: '0 0% 64%',
        secondaryContent: '0 0% 0%',
        accent: '0 0% 74%',
        accentFocus: '0 0% 64%',
        accentContent: '0 0% 0%',
        neutral: '0 0% 74%',
        neutralFocus: '0 0% 64%',
        neutralContent: '0 0% 0%',
        base100: '0 0% 100%',
        base200: '0 0% 93%',
        base300: '0 0% 87%',
        baseContent: '0 0% 0%',
        info: '0 0% 74%',
        infoContent: '0 0% 0%',
        success: '0 0% 74%',
        successContent: '0 0% 0%',
        warning: '0 0% 74%',
        warningContent: '0 0% 0%',
        error: '0 0% 74%',
        errorContent: '0 0% 0%',
    },
    black: {
        primary: '0 0% 40%',
        primaryFocus: '0 0% 30%',
        primaryContent: '0 0% 100%',
        secondary: '0 0% 30%',
        secondaryFocus: '0 0% 20%',
        secondaryContent: '0 0% 100%',
        accent: '0 0% 70%',
        accentFocus: '0 0% 60%',
        accentContent: '0 0% 100%',
        neutral: '0 0% 20%',
        neutralFocus: '0 0% 15%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 0%',
        base200: '0 0% 5%',
        base300: '0 0% 10%',
        baseContent: '0 0% 80%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    luxury: {
        primary: '46 42% 60%',
        primaryFocus: '46 42% 50%',
        primaryContent: '0 0% 100%',
        secondary: '218 23% 23%',
        secondaryFocus: '218 23% 18%',
        secondaryContent: '0 0% 100%',
        accent: '195 53% 79%',
        accentFocus: '195 53% 69%',
        accentContent: '195 20% 15%',
        neutral: '231 14% 31%',
        neutralFocus: '231 14% 26%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '46 8% 92%',
        base300: '46 5% 80%',
        baseContent: '46 15% 15%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    dracula: {
        primary: '330 100% 75%',
        primaryFocus: '330 100% 65%',
        primaryContent: '0 0% 100%',
        secondary: '265 89% 78%',
        secondaryFocus: '265 89% 68%',
        secondaryContent: '0 0% 100%',
        accent: '326 100% 74%',
        accentFocus: '326 100% 64%',
        accentContent: '0 0% 100%',
        neutral: '231 15% 18%',
        neutralFocus: '231 15% 14%',
        neutralContent: '0 0% 100%',
        base100: '230 15% 23%',
        base200: '230 14% 20%',
        base300: '230 13% 17%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    cmyk: {
        primary: '180 100% 50%',
        primaryFocus: '180 100% 40%',
        primaryContent: '0 0% 100%',
        secondary: '300 100% 50%',
        secondaryFocus: '300 100% 40%',
        secondaryContent: '0 0% 100%',
        accent: '60 100% 50%',
        accentFocus: '60 100% 40%',
        accentContent: '0 0% 100%',
        neutral: '0 0% 20%',
        neutralFocus: '0 0% 15%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '0 0% 95%',
        base300: '0 0% 87%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    autumn: {
        primary: '21 90% 48%',
        primaryFocus: '21 90% 38%',
        primaryContent: '0 0% 100%',
        secondary: '158 58% 40%',
        secondaryFocus: '158 58% 30%',
        secondaryContent: '0 0% 100%',
        accent: '43 89% 38%',
        accentFocus: '43 89% 28%',
        accentContent: '0 0% 100%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '24 21% 92%',
        base300: '24 17% 82%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    business: {
        primary: '215 28% 17%',
        primaryFocus: '215 28% 13%',
        primaryContent: '0 0% 100%',
        secondary: '262 80% 43%',
        secondaryFocus: '262 80% 33%',
        secondaryContent: '0 0% 100%',
        accent: '199 89% 48%',
        accentFocus: '199 89% 38%',
        accentContent: '0 0% 100%',
        neutral: '219 14% 28%',
        neutralFocus: '219 14% 23%',
        neutralContent: '0 0% 100%',
        base100: '220 17% 17%',
        base200: '220 15% 15%',
        base300: '220 13% 13%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    acid: {
        primary: '300 100% 50%',
        primaryFocus: '300 100% 40%',
        primaryContent: '0 0% 100%',
        secondary: '180 100% 50%',
        secondaryFocus: '180 100% 40%',
        secondaryContent: '0 0% 100%',
        accent: '60 100% 50%',
        accentFocus: '60 100% 40%',
        accentContent: '0 0% 100%',
        neutral: '0 0% 0%',
        neutralFocus: '0 0% 0%',
        neutralContent: '0 0% 100%',
        base100: '60 100% 97%',
        base200: '60 100% 90%',
        base300: '60 100% 80%',
        baseContent: '0 0% 0%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    lemonade: {
        primary: '141 80% 38%',
        primaryFocus: '141 80% 28%',
        primaryContent: '0 0% 100%',
        secondary: '262 52% 47%',
        secondaryFocus: '262 52% 37%',
        secondaryContent: '0 0% 100%',
        accent: '199 98% 48%',
        accentFocus: '199 98% 38%',
        accentContent: '0 0% 100%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '0 0% 100%',
        base200: '40 33% 94%',
        base300: '40 30% 84%',
        baseContent: '0 0% 20%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    night: {
        primary: '216 100% 64%',
        primaryFocus: '216 100% 54%',
        primaryContent: '0 0% 100%',
        secondary: '326 78% 49%',
        secondaryFocus: '326 78% 39%',
        secondaryContent: '0 0% 100%',
        accent: '175 84% 39%',
        accentFocus: '175 84% 29%',
        accentContent: '0 0% 100%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '222 47% 11%',
        base200: '222 45% 9%',
        base300: '222 43% 8%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    coffee: {
        primary: '24 57% 22%',
        primaryFocus: '24 57% 17%',
        primaryContent: '0 0% 100%',
        secondary: '189 41% 40%',
        secondaryFocus: '189 41% 30%',
        secondaryContent: '0 0% 100%',
        accent: '41 28% 58%',
        accentFocus: '41 28% 48%',
        accentContent: '41 15% 15%',
        neutral: '17 16% 17%',
        neutralFocus: '17 16% 13%',
        neutralContent: '0 0% 100%',
        base100: '24 19% 10%',
        base200: '24 17% 8%',
        base300: '24 15% 7%',
        baseContent: '0 0% 85%',
        info: '198 93% 60%',
        infoContent: '0 0% 15%',
        success: '158 64% 52%',
        successContent: '0 0% 15%',
        warning: '43 96% 56%',
        warningContent: '0 0% 15%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
    winter: {
        primary: '218 100% 60%',
        primaryFocus: '218 100% 50%',
        primaryContent: '0 0% 100%',
        secondary: '271 83% 74%',
        secondaryFocus: '271 83% 64%',
        secondaryContent: '0 0% 100%',
        accent: '175 70% 41%',
        accentFocus: '175 70% 31%',
        accentContent: '0 0% 100%',
        neutral: '218 18% 12%',
        neutralFocus: '218 18% 9%',
        neutralContent: '0 0% 100%',
        base100: '220 26% 97%',
        base200: '220 23% 87%',
        base300: '220 20% 77%',
        baseContent: '220 26% 17%',
        info: '198 93% 60%',
        infoContent: '0 0% 100%',
        success: '158 64% 52%',
        successContent: '0 0% 100%',
        warning: '43 96% 56%',
        warningContent: '0 0% 20%',
        error: '0 91% 71%',
        errorContent: '0 0% 100%',
    },
};

export default {
    props: {
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: [
        'update:content',
        'update:content:effect',
        'change-menu-visibility',
        'change-borders-style',
        'add-state',
        'remove-state',
        'trigger-event',
    ],
    setup(props) {
        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */
        const {
            hasLink,
            tag: linkTag,
            properties,
        } = wwLib.wwElement.useLink({
            isDisabled: computed(() => props.content.disabled),
        });
        return {
            /* wwEditor:start */
            createElement,
            /* wwEditor:end */
            hasLink,
            linkTag,
            properties,
        };
    },

    data() {
        return {
            isReallyFocused: false,
            isReallyActive: false,
        };
    },
    computed: {
        activeTheme() {
            // If customTheme is bound, use it; otherwise use selected theme
            if (this.content?.customTheme && typeof this.content.customTheme === 'object') {
                return this.content.customTheme;
            }
            const themeName = this.content?.daisyTheme || 'light';
            return DAISY_THEMES[themeName] || DAISY_THEMES.light;
        },
        daisyThemeVars() {
            const theme = this.activeTheme;
            return {
                '--p': theme?.primary || '259 94% 51%',
                '--pf': theme?.primaryFocus || '259 94% 41%',
                '--pc': theme?.primaryContent || '0 0% 100%',
                '--s': theme?.secondary || '314 100% 47%',
                '--sf': theme?.secondaryFocus || '314 100% 37%',
                '--sc': theme?.secondaryContent || '0 0% 100%',
                '--a': theme?.accent || '174 60% 51%',
                '--af': theme?.accentFocus || '174 60% 41%',
                '--ac': theme?.accentContent || '0 0% 100%',
                '--n': theme?.neutral || '219 14% 28%',
                '--nf': theme?.neutralFocus || '219 14% 18%',
                '--nc': theme?.neutralContent || '0 0% 100%',
                '--b1': theme?.base100 || '0 0% 100%',
                '--b2': theme?.base200 || '0 0% 95%',
                '--b3': theme?.base300 || '0 0% 87%',
                '--bc': theme?.baseContent || '0 0% 20%',
                '--in': theme?.info || '198 93% 60%',
                '--inc': theme?.infoContent || '0 0% 100%',
                '--su': theme?.success || '158 64% 52%',
                '--suc': theme?.successContent || '0 0% 100%',
                '--wa': theme?.warning || '43 96% 56%',
                '--wac': theme?.warningContent || '0 0% 20%',
                '--er': theme?.error || '0 91% 71%',
                '--erc': theme?.errorContent || '0 0% 100%',
            };
        },
        daisyButtonStyles() {
            const variant = this.content?.daisyColorVariant || 'primary';
            const size = this.content?.daisySize || 'md';
            const style = this.content?.daisyStyle || 'solid';
            const rounded = this.content?.daisyRounded || 'md';
            const shadow = this.content?.daisyShadow || false;

            // Size mapping
            const sizeMap = {
                xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', minHeight: '1.5rem' },
                sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', minHeight: '2rem' },
                md: { padding: '0.5rem 1rem', fontSize: '0.875rem', minHeight: '3rem' },
                lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', minHeight: '4rem' },
            };

            // Rounded mapping
            const roundedMap = {
                none: '0',
                sm: '0.125rem',
                md: '0.5rem',
                lg: '1rem',
                full: '9999px',
            };

            // Color variant mapping to CSS variables
            const variantMap = {
                primary: { bg: 'hsl(var(--p))', bgHover: 'hsl(var(--pf))', content: 'hsl(var(--pc))' },
                secondary: { bg: 'hsl(var(--s))', bgHover: 'hsl(var(--sf))', content: 'hsl(var(--sc))' },
                accent: { bg: 'hsl(var(--a))', bgHover: 'hsl(var(--af))', content: 'hsl(var(--ac))' },
                neutral: { bg: 'hsl(var(--n))', bgHover: 'hsl(var(--nf))', content: 'hsl(var(--nc))' },
                info: { bg: 'hsl(var(--in))', bgHover: 'hsl(var(--in) / 0.8)', content: 'hsl(var(--inc))' },
                success: { bg: 'hsl(var(--su))', bgHover: 'hsl(var(--su) / 0.8)', content: 'hsl(var(--suc))' },
                warning: { bg: 'hsl(var(--wa))', bgHover: 'hsl(var(--wa) / 0.8)', content: 'hsl(var(--wac))' },
                error: { bg: 'hsl(var(--er))', bgHover: 'hsl(var(--er) / 0.8)', content: 'hsl(var(--erc))' },
                ghost: { bg: 'transparent', bgHover: 'hsl(var(--b2))', content: 'currentColor' },
            };

            const colors = variantMap[variant] || variantMap.primary;
            const sizeStyles = sizeMap[size] || sizeMap.md;

            const baseStyles = {
                ...sizeStyles,
                borderRadius: roundedMap[rounded] || roundedMap.md,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'transparent',
                cursor: this.content?.disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease-in-out',
                textAlign: 'center',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                userSelect: 'none',
                opacity: this.content?.disabled ? '0.6' : '1',
            };

            // Apply style-specific overrides
            if (style === 'outline') {
                return {
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    borderColor: colors.bg,
                    color: colors.bg,
                    '--btn-hover-bg': colors.bg,
                    '--btn-hover-color': colors.content,
                    boxShadow: shadow ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
                };
            } else if (style === 'ghost') {
                return {
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    color: colors.bg,
                    '--btn-hover-bg': 'hsl(var(--b2))',
                    '--btn-hover-color': colors.bg,
                    boxShadow: 'none',
                };
            } else if (style === 'glass') {
                return {
                    ...baseStyles,
                    backgroundColor: colors.bg,
                    backdropFilter: 'blur(40px)',
                    color: colors.content,
                    '--btn-hover-bg': colors.bgHover,
                    '--btn-hover-color': colors.content,
                    boxShadow: shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                };
            } else if (style === 'link') {
                return {
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    color: colors.bg,
                    textDecoration: 'underline',
                    padding: '0',
                    minHeight: 'auto',
                    '--btn-hover-bg': 'transparent',
                    '--btn-hover-color': colors.bgHover,
                    boxShadow: 'none',
                };
            } else {
                // solid style (default)
                return {
                    ...baseStyles,
                    backgroundColor: colors.bg,
                    borderColor: colors.bg,
                    color: colors.content,
                    '--btn-hover-bg': colors.bgHover,
                    '--btn-hover-color': colors.content,
                    boxShadow: shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                };
            }
        },
        buttonStyle() {
            return {
                justifyContent: TEXT_ALIGN_TO_JUSTIFY[this.content['_ww-text_textAlign']] || 'center',
                ...this.daisyThemeVars,
                ...this.daisyButtonStyles,
            };
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        tag() {
            if (this.isEditing) return 'div';
            if (this.hasLink) {
                return this.linkTag;
            }
            if (
                this.content.buttonType === 'submit' ||
                this.content.buttonType === 'reset' ||
                this.content.buttonType === 'button'
            )
                return 'button';
            return 'div';
        },
        buttonType() {
            if (this.isEditing || this.hasLink) return '';
            if (
                this.content.buttonType === 'submit' ||
                this.content.buttonType === 'reset' ||
                this.content.buttonType === 'button'
            )
                return this.content.buttonType;
            return '';
        },
        text() {
            return this.wwElementState.props.text;
        },
        isFocused() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('focus');
            }
            /* wwEditor:end */
            return this.isReallyFocused;
        },
        isActive() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('active');
            }
            /* wwEditor:end */
            return this.isReallyActive;
        },
        daisyClasses() {
            const classes = ['daisy-btn'];

            if (this.content?.daisyAnimation) {
                classes.push('daisy-animate');
            }

            return classes.join(' ');
        },
    },
    watch: {
        /* wwEditor:start */
        'content.hasRightIcon': {
            async handler(hasRightIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasRightIcon && !this.content.rightIcon) {
                    const content = await this.createElement('ww-icon');
                    this.$emit('update:content:effect', { rightIcon: content });
                }
            },
        },
        'content.hasLeftIcon': {
            async handler(hasLeftIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasLeftIcon && !this.content.leftIcon) {
                    const content = await this.createElement('ww-icon');
                    this.$emit('update:content:effect', { leftIcon: content });
                }
            },
        },
        /* wwEditor:end */
        'content.disabled': {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'disabled');
                } else {
                    this.$emit('remove-state', 'disabled');
                }
            },
        },
        isReallyFocused(isFocused, wasFocused) {
            if (isFocused && !wasFocused) {
                this.$emit('trigger-event', { name: 'focus' });
            } else if (!isFocused && wasFocused) {
                this.$emit('trigger-event', { name: 'blur' });
            }
        },
        isFocused: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'focus');
                } else {
                    this.$emit('remove-state', 'focus');
                }
            },
        },
        isActive: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'active');
                } else {
                    this.$emit('remove-state', 'active');
                }
            },
        },
    },
    methods: {
        /* wwEditor:start */
        selectParentFormContainer() {
            const parentUid = wwLib.selectParentByFlag(this.$el, 'form-container');
            if (!parentUid) {
                wwLib.wwNotification.open({
                    text: {
                        en: 'No parent form container found. Please, add this submit button into a form container.',
                        fr: 'Aucun formulaire parent trouvé. Veuillez intégrer ce bouton submit dans un form container.',
                    },
                    color: 'yellow',
                    duration: 6000,
                });
            }
        },
        /* wwEditor:end */
        onBlur() {
            this.isReallyFocused = false;
        },
        onActivate(event) {
            this.isReallyActive = true;
            // Emit the original event name
            const eventName = event.type;
            this.$emit('trigger-event', { name: eventName, event });
        },
        onDeactivate(event) {
            this.isReallyActive = false;
            // Emit the original event name
            const eventName = event.type;
            this.$emit('trigger-event', { name: eventName, event });
        },
        onTouchActivate() {
            this.isReallyActive = true;
        },
        onTouchDeactivate() {
            this.isReallyActive = false;
        },
        onMouseActivate() {
            this.isReallyActive = true;
        },
        onMouseDeactivate() {
            this.isReallyActive = false;
        },
        onKeyActivate() {
            this.isReallyActive = true;
        },
        onKeyDeactivate() {
            this.isReallyActive = false;
        },
        onKeyDown(event) {
            this.$emit('trigger-event', { name: 'keydown', event });
        },
        onKeyUp(event) {
            this.$emit('trigger-event', { name: 'keyup', event });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-button {
    justify-content: center;
    align-items: center;
    &.button {
        outline: none;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
    }
    &.-link {
        cursor: pointer;
    }

    // DaisyUI button styles
    &.daisy-btn {
        position: relative;
        overflow: hidden;

        // Hover effects
        &:hover:not(:disabled) {
            background-color: var(--btn-hover-bg);
            color: var(--btn-hover-color);
            transform: translateY(-1px);
        }

        // Active/pressed state
        &:active:not(:disabled),
        &.active:not(:disabled) {
            transform: translateY(0) scale(0.98);
        }

        // Focus state
        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }

        // Click animation
        &.daisy-animate:active:not(:disabled) {
            animation: button-pop 0.25s ease-in-out;
        }

        // Disabled state
        &:disabled {
            pointer-events: none;
            opacity: 0.6;
        }
    }
}

// Click animation keyframes
@keyframes button-pop {
    0% {
        transform: scale(0.95);
    }
    40% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
    }
}
</style>
