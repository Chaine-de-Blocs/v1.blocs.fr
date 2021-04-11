import { classNames } from "../core/css";

interface TermLine {
    cmd: HTMLElement;
    hideClipboard?: boolean;
    prompt?: string;
    stdout?: Array<string | HTMLElement>;
}

type Props = {
    title: string;
    defaultPrompt: string;

    lines: Array<TermLine>;
}

const genID = (): string => {
    return 'g' + Math.random().toString(36).substr(2, 9);
}

const getID = (baseID: string, i: number): string => baseID + '_' + i;

const renderTermLines = (prompt: string, lines: Array<TermLine>, baseID: string) => lines.map((l, i) => (
    <div key={i} className={classNames('cmd')}>
        <span className={classNames('prompt')}>
            {l.prompt ?? prompt}
        </span>
        {
            !l.hideClipboard &&
                <span className={classNames("clipboard-action") + " cliboard-action-selector"} data-value={getID(baseID, i)}>
                    📋
                </span>
        }
        <span id={getID(baseID, i)}>{l.cmd}</span>
        <span id={getID(baseID, i) + '_copy-result'} className={classNames("copy-result")}>
            C'est copié !
        </span>
        {
            l.stdout && l.stdout.map((stdout, i) =>
                typeof stdout === 'string'
                    ? <div dangerouslySetInnerHTML={{__html: stdout}} key={i}></div>
                    : <div key={i}>{stdout}</div>
                
            )
        }
    </div>
));

export default ({
    title, defaultPrompt, lines,
}: Props) => (
    <div className={classNames('terminal')}>
        <div className={classNames('fake-bar')}>
            <div className={classNames('fake-menu')}>
                <div className={classNames('fake-buttons fake-close')}></div>
                <div className={classNames('fake-buttons fake-minimize')}></div>
                <div className={classNames('fake-buttons fake-zoom')}></div>
            </div>
            <p className={classNames('fake-title')}>{title}</p>
        </div>
        <div className={classNames('fake-screen')}>
            {renderTermLines(defaultPrompt, lines, genID())}
        </div>
    </div>
)