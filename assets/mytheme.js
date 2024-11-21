import {Aura} from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";


export const MyPreset = definePreset(Aura, {
    primitive: {
        borderRadius: {
            none: "0",
            xs: "2px",
            sm: "4px",
            md: "6px",
            lg: "8px",
            xl: "12px"
        },
    },
    semantic: {
        transitionDuration: "0.2s",
        focusRing: {
            width: "1px",
            style: "solid",
            color: "{primary.color}",
            offset: "2px",
            shadow: "none"
        },
        disabledOpacity: "0.6",
        iconSize: "1rem",
        anchorGutter: "2px",
        primary: {
            50: "#f8fdfa",
            100: "#dcf7e7",
            200: "#c0f0d3",
            300: "#a4e9c0",
            400: "#89e3ac",
            500: "#6ddc99",
            600: "#5dbb82",
            700: "#4c9a6b",
            800: "#3c7954",
            900: "#2c583d",
            950: "#1b3726"
        },
        formField: {
            paddingX: "0.75rem",
            paddingY: "0.5rem",
            sm: {
                fontSize: "0.875rem",
                paddingX: "0.625rem",
                paddingY: "0.375rem"
            },
            lg: {
                fontSize: "1.125rem",
                paddingX: "0.875rem",
                paddingY: "0.625rem"
            },
            borderRadius: "{border.radius.md}",
            focusRing: {
                width: "0",
                style: "none",
                color: "transparent",
                offset: "0",
                shadow: "none"
            },
            transitionDuration: "{transition.duration}"
        },
        avatar: {
            width: "50px",
            length: "50px"

        },
        list: {
            padding: "0.25rem 0.25rem",
            gap: "2px",
            header: {
                padding: "0.5rem 1rem 0.25rem 1rem"
            },
            option: {
                padding: "0.5rem 0.75rem",
                borderRadius: "{border.radius.sm}"
            },
            optionGroup: {
                padding: "0.5rem 0.75rem",
                fontWeight: "600"
            }
        },
        content: {
            borderRadius: "{border.radius.md}"
        },
        mask: {
            transitionDuration: "0.15s"
        },
        navigation: {
            list: {
                padding: "0.25rem 0.25rem",
                gap: "2px"
            },
            item: {
                padding: "0.5rem 0.75rem",
                borderRadius: "{border.radius.sm}",
                gap: "0.5rem"
            },
            submenuLabel: {
                padding: "0.5rem 0.75rem",
                fontWeight: "600"
            },
            submenuIcon: {
                size: "0.875rem"
            }
        },
        overlay: {
            select: {
                borderRadius: "{border.radius.md}",
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            },
            popover: {
                borderRadius: "{border.radius.md}",
                padding: "0.75rem",
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            },
            modal: {
                borderRadius: "{border.radius.xl}",
                padding: "1.25rem",
                shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            },
            navigation: {
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            }
        },
        colorScheme: {
            light: {
                surface: {
                    0: "#ffffff",
                    50: "#fafbfc",
                    100: "#e9edf1",
                    200: "#d7dee6",
                    300: "#c5cfdc",
                    400: "#b4c1d1",
                    500: "#a2b2c6",
                    600: "#8a97a8",
                    700: "#717d8b",
                    800: "#59626d",
                    900: "#41474f",
                    950: "#292d32"
                },
                primary: {
                    color: "{primary.500}",
                    contrastColor: "#ffffff",
                    hoverColor: "{primary.600}",
                    activeColor: "{primary.700}"
                },
                highlight: {
                    background: "{primary.50}",
                    focusBackground: "{primary.100}",
                    color: "{primary.700}",
                    focusColor: "{primary.800}"
                },
                mask: {
                    background: "rgba(0,0,0,0.4)",
                    color: "{surface.200}"
                },
                formField: {
                    background: "{surface.0}",
                    disabledBackground: "{surface.200}",
                    filledBackground: "{surface.50}",
                    filledHoverBackground: "{surface.50}",
                    filledFocusBackground: "{surface.50}",
                    borderColor: "{surface.300}",
                    hoverBorderColor: "{surface.400}",
                    focusBorderColor: "{primary.color}",
                    invalidBorderColor: "{red.400}",
                    color: "{surface.700}",
                    disabledColor: "{surface.500}",
                    placeholderColor: "{surface.500}",
                    invalidPlaceholderColor: "{red.600}",
                    floatLabelColor: "{surface.500}",
                    floatLabelFocusColor: "{primary.600}",
                    floatLabelActiveColor: "{surface.500}",
                    floatLabelInvalidColor: "{form.field.invalid.placeholder.color}",
                    iconColor: "{surface.400}",
                    shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
                },
                card:{
                    background: "{surface.50}",
                    color: "{surface.600}",
                    shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)",
                },
                text: {
                    color: "{surface.700}",
                    hoverColor: "{primary.700}",
                    mutedColor: "{surface.600}",
                    hoverMutedColor: "{surface.800}"
                },
                content: {
                    background: "{surface.0}",
                    hoverBackground: "{primary.500}",
                    borderColor: "{surface.200}",
                    color: "{text.color}",
                    hoverColor: "{text.hover.color}"
                },
                overlay: {
                    select: {
                        background: "{surface.0}",
                        borderColor: "{surface.200}",
                        color: "{text.color}"
                    },
                    popover: {
                        background: "{surface.0}",
                        borderColor: "{surface.200}",
                        color: "{text.color}"
                    },
                    modal: {
                        background: "{surface.0}",
                        borderColor: "{surface.200}",
                        color: "{text.color}"
                    }
                },
                list: {
                    option: {
                        focusBackground: "{surface.100}",
                        selectedBackground: "{highlight.background}",
                        selectedFocusBackground: "{highlight.focus.background}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        selectedColor: "{highlight.color}",
                        selectedFocusColor: "{highlight.focus.color}",
                        icon: {
                            color: "{surface.400}",
                            focusColor: "{surface.500}"
                        }
                    },
                    optionGroup: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    }
                },
                navigation: {
                    item: {
                        focusBackground: "{surface.200}",
                        activeBackground: "{surface.100}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        activeColor: "{text.hover.color}",
                        icon: {
                            color: "{surface.400}",
                            focusColor: "{surface.500}",
                            activeColor: "{surface.500}"
                        }
                    },
                    submenuLabel: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    },
                    submenuIcon: {
                        color: "{surface.400}",
                        focusColor: "{surface.500}",
                        activeColor: "{text.hover.color}"
                    }
                }
            },
            dark: {
                surface: {
                    0: "#ffffff",
                    50: "#fafbfc",
                    100: "#e9edf1",
                    200: "#d7dee6",
                    300: "#c5cfdc",
                    400: "#b4c1d1",
                    500: "#a2b2c6",
                    600: "#8a97a8",
                    700: "#717d8b",
                    800: "#59626d",
                    900: "#41474f",
                    950: "#292d32"
                },
                primary: {
                    color: "{primary.400}",
                    contrastColor: "{surface.900}",
                    hoverColor: "{primary.300}",
                    activeColor: "{primary.200}"
                },
                highlight: {
                    background: "color-mix(in srgb, {primary.400}, transparent 84%)",
                    focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                mask: {
                    background: "rgba(0,0,0,0.6)",
                    color: "{surface.200}"
                },
                formField: {
                    background: "{surface.950}",
                    disabledBackground: "{surface.700}",
                    filledBackground: "{surface.800}",
                    filledHoverBackground: "{surface.800}",
                    filledFocusBackground: "{surface.800}",
                    borderColor: "{surface.600}",
                    hoverBorderColor: "{surface.500}",
                    focusBorderColor: "{primary.color}",
                    invalidBorderColor: "{red.300}",
                    color: "{surface.0}",
                    disabledColor: "{surface.400}",
                    placeholderColor: "{surface.400}",
                    invalidPlaceholderColor: "{red.400}",
                    floatLabelColor: "{surface.400}",
                    floatLabelFocusColor: "{primary.color}",
                    floatLabelActiveColor: "{surface.400}",
                    floatLabelInvalidColor: "{form.field.invalid.placeholder.color}",
                    iconColor: "{surface.400}",
                    shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
                },
                text: {
                    color: "{surface.0}",
                    hoverColor: "{surface.0}",
                    mutedColor: "{surface.400}",
                    hoverMutedColor: "{surface.300}"
                },
                card:{
                    background: "{surface.900}",
                    color: "{text.color}",
                    shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)",
                },
                content: {
                    background: "{surface.900}",
                    hoverBackground: "{surface.800}",
                    borderColor: "{surface.700}",
                    color: "{text.color}",
                    hoverColor: "{text.hover.color}"
                },
                overlay: {
                    select: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    },
                    popover: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    },
                    modal: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    }
                },
                list: {
                    option: {
                        focusBackground: "{surface.800}",
                        selectedBackground: "{highlight.background}",
                        selectedFocusBackground: "{highlight.focus.background}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        selectedColor: "{highlight.color}",
                        selectedFocusColor: "{highlight.focus.color}",
                        icon: {
                            color: "{surface.500}",
                            focusColor: "{surface.400}"
                        }
                    },
                    optionGroup: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    }
                },
                navigation: {
                    item: {
                        focusBackground: "{surface.800}",
                        activeBackground: "{surface.800}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        activeColor: "{text.hover.color}",
                        icon: {
                            color: "{surface.500}",
                            focusColor: "{surface.400}",
                            activeColor: "{surface.400}"
                        }
                    },
                    submenuLabel: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    },
                    submenuIcon: {
                        color: "{surface.500}",
                        focusColor: "{surface.400}",
                        activeColor: "{surface.400}"
                    }
                }
            }
        }
    }
});
