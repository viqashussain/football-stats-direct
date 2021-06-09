import IsJsonString from 'helpers';

export default function PlayerNameCellRenderer(props) {
    
    if (!props.value)
    {
        return null;
    }

    let value;

    if (IsJsonString(props.value))
    {
        value = JSON.parse(props.value);
    }
    else
    {
        value = props.value;
    }

    if (props.node.allLeafChildren)
    {
        value = props.node.allLeafChildren[0].data.player;
    }

    return (
        <div>
            <img
                height='20px'
                style={{paddingRight: '10px'}}
                alt={value.firstname}
                src={value.photo}
            />
            <span>{value.firstname} {value.lastname}</span>
        </div>
    )
}   