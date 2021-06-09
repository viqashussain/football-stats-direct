import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
    resultIndicator: {
        height: '32px',
        width: '32px',
        borderRadius: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        textAlign: 'center',
        lineHeight: '32px',
        fontWeight: 'bold'
    },
    win: {
        backgroundColor: '#13cf00'
    },
    draw: {
        backgroundColor: '#76766f'
    },
    loss: {
        backgroundColor: '#d81920'
    }
});


export default function FormCellRenderer(props) {
    const classes = styles()

    if (!props.value)
    {
        return null;
    }

    return (
        <div>
            {props.value.split('').map(x => {
                const resultClassName = x === 'W' ? classes.win : x === 'L' ? classes.loss : classes.draw;
                return <span className={classes.resultIndicator + ' ' + resultClassName}>{x}</span>
            })}
        </div>
    );
}