import IsJsonString from 'helpers';

export default function PlayerTeamNameCellRenderer(props) {

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
        value = props.node.allLeafChildren[0].data.statistics[0].team;
    }

    return (
        <div>
            <img
                height='20px'
                style={{paddingRight: '10px'}}
                alt={value.name}
                src={value.logo}
            />
            <span>{value.name}</span>
        </div>
    )
}   