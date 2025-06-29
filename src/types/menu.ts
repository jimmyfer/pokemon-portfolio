export interface BeforeCloseContext {
    cancel(): void;
    readonly canceled: boolean;
}

export type BeforeCloseHandler = (
    ctx: BeforeCloseContext
) => void | Promise<void>;

export type AfterCloseHandler = () => void;
