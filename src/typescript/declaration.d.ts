declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module '*.svg' {
    const content: string
    export = content;
}

declare module '*.png' {
    const content: string
    export = content;
}

declare module '*.jpg' {
    const content: string
    export = content;
}

declare module '*.gif' {
    const content: string
    export = content;
}

interface Config {
    punkApi: string
}

declare module 'Config' {
    const config: Config
    export = config
}
