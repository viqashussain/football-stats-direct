export enum Leagues {
    All = 'All',
    PremierLeague = 'PremierLeague',
    LaLiga = 'LaLiga',
    SerieA = 'SerieA',
    Ligue1 = 'Ligue1',
    Bundesliga = 'Bundesliga'
}

export enum StatsType {
    League,
    Player
}

export enum DataDisplayType {
    Grid,
    Graph
}

export enum GraphType {
    Bar,
    Scatter
}

export enum ShowAllStats {
    Simple,
    All
}

export enum PlayerStats {
    TopScorers = 'TopScorers',
    TopAssists = 'TopAssists',
    MostYellowCards = 'MostYellowCards',
    MostRedCards = 'MostRedCards',
    All = 'All'
}

export const leaguesIds = [
    { name: Leagues.PremierLeague, id: 39 },
    { name: Leagues.LaLiga, id: 140 },
    { name: Leagues.SerieA, id: 135 },
    { name: Leagues.Ligue1, id: 61 },
    { name: Leagues.Bundesliga, id: 78 }
]

export const TopScorersSeriesDataBar = [{
    type: 'column',
    xKey: 'playername',
    yKeys: ['goalstotal'],
    yNames: ['Goals'],
    label: {
        formatter: function (params) {
            return params.value === undefined
                ? ''
                : params.value.toFixed(0);
        },
    },
}]

export const TopScorersSeriesDataScatter = [{
    type: 'scatter',
    xKey: 'gamesminutes',
    yKey: 'goalstotal',
    yName: 'Goals',
    xName: 'Minutes',
    sizeKey: 'goalstotal',
    sizeName: 'Goals',
    marker: {
        shape: 'circle',
        size: 6,
        maxSize: 30,
    },
    labelKey: 'playername',
    labelName: 'Name'
}]

export const MostYellowCardsSeriesDataBar = [{
    type: 'column',
    xKey: 'playername',
    yKeys: ['cardsyellow'],
    yNames: ['Yellow Cards'],
    label: {
        formatter: function (params) {
            return params.value === undefined
                ? ''
                : params.value.toFixed(0);
        },
    },
}]

export const MostYellowCardsSeriesDataScatter = [{
    type: 'scatter',
    xKey: 'gamesminutes',
    yKey: 'cardsyellow',
    yName: 'Yellow Cards',
    xName: 'Minutes',
    sizeKey: 'cardsyellow',
    sizeName: 'Yellow Cards',
    marker: {
        shape: 'circle',
        size: 6,
        maxSize: 30,
    },
    labelKey: 'playername',
    labelName: 'Name'
}]

export const MostRedCardsSeriesDataBar = [{
    type: 'column',
    xKey: 'playername',
    yKeys: ['cardsred'],
    yNames: ['Red Cards'],
    label: {
        formatter: function (params) {
            return params.value === undefined
                ? ''
                : params.value.toFixed(0);
        },
    },
}]

export const MostRedCardsSeriesDataScatter = [{
    type: 'scatter',
    xKey: 'gamesminutes',
    yKey: 'cardsred',
    yName: 'Red Cards',
    xName: 'Minutes',
    sizeKey: 'cardsred',
    sizeName: 'Red Cards',
    marker: {
        shape: 'circle',
        size: 6,
        maxSize: 30,
    },
    labelKey: 'playername',
    labelName: 'Name'
}]

export const MostAssistSeriesDataBar = [{
    type: 'column',
    xKey: 'playername',
    yKeys: ['goalsassists'],
    yNames: ['Assists'],
    label: {
        formatter: function (params) {
            return params.value === undefined
                ? ''
                : params.value.toFixed(0);
        },
    },
}]

export const MostAssistSeriesDataScatter = [{
    type: 'scatter',
    xKey: 'gamesminutes',
    yKey: 'goalsassists',
    yName: 'Assists',
    xName: 'Minutes',
    sizeKey: 'goalsassists',
    sizeName: 'Assists',
    marker: {
        shape: 'circle',
        size: 6,
        maxSize: 30,
    },
    labelKey: 'playername',
    labelName: 'Name'
}]

export const AllPlayersSeriesDataScatter = [
    {
        type: 'scatter',
        xKey: 'gamesminutes',
        yKey: 'goalstotal',
        yName: 'Goals',
        xName: 'Minutes',
        sizeKey: 'goalstotal',
        sizeName: 'Goals',
        marker: {
            shape: 'circle',
            size: 6,
            maxSize: 30,
        },
        labelKey: 'playername',
        labelName: 'Name'
    },
    {
        type: 'scatter',
        xKey: 'gamesminutes',
        yKey: 'goalsassists',
        yName: 'Assists',
        xName: 'Minutes',
        sizeKey: 'goalsassists',
        sizeName: 'Assists',
        marker: {
            shape: 'square',
            size: 6,
            maxSize: 30,
        },
        labelKey: 'playername',
        labelName: 'Name'
    }
]

export const AllPlayersSeriesDataBar = [{
    type: 'column',
    xKey: 'playername',
    yKeys: ['goalstotal', 'goalsassists'],
    yNames: ['Goals', 'Assists'],
    label: {
        formatter: function (params) {
            return params.value === undefined
                ? ''
                : params.value.toFixed(0);
        },
    },
}]

export const leagueStandingsColumnDefs = [
    { headerName: 'Row Number', field: 'row', filter: 'agNumberColumnFilter', enableValue: true, valueGetter: "node.rowIndex + 1" },
    {
        headerName: 'League Position', field: 'rank', filter: 'agNumberColumnFilter', enableValue: true
    },
    {
        headerName: 'Team', field: 'team', cellRenderer: 'teamNameCellRenderer', filter: 'agTextColumnFilter',
        keyCreator: (params) => {
            if (!params.value) { return; }
            return params.value.name;
        },
        filterParams: {
            valueGetter: params => {
                if (!params.data) { return; }
                return params.data.team.name
            }
        }
    },
    { headerName: 'Points', field: 'points', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Played', field: 'all.played', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Won', field: 'all.win', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Drawn', field: 'all.draw', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Lost', field: 'all.lose', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Goals For', field: 'all.goals.for', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Goals Against', field: 'all.goals.against', filter: 'agNumberColumnFilter', enableValue: true },
    {
        headerName: 'Goal Difference',
        field: 'goalsDiff', valueGetter: (params) => {
            if (!params.data) {
                return null;
            }
            if (params.data.goalsDiff < 0) {
                return params.data.goalsDiff;
            }
            else {
                return '+' + params.data.goalsDiff;
            }
        }, filter: 'agNumberColumnFilter', enableValue: true
    },
    { headerName: 'Form', field: 'form', cellRenderer: 'formCellRenderer' },
];

export const leagueStandingsColumnDefsAll = leagueStandingsColumnDefs.concat([
    { headerName: 'Home Played', field: 'home.played', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Home Won', field: 'home.win', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Home Drawn', field: 'home.draw', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Home Lost', field: 'home.lose', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Home Goals For', field: 'home.goals.for', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Home Goals Against', field: 'home.goals.against', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Played', field: 'away.played', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Won', field: 'away.win', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Drawn', field: 'away.draw', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Lost', field: 'away.lose', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Goals For', field: 'away.goals.for', filter: 'agNumberColumnFilter', enableValue: true },
    { headerName: 'Away Goals Against', field: 'away.goals.against', filter: 'agNumberColumnFilter', enableValue: true },
])

export const statusBar = {
    statusPanels: [
        {
            statusPanel: 'agTotalAndFilteredRowCountComponent',
            align: 'left',
        },
        {
            statusPanel: 'agTotalRowCountComponent',
            align: 'center',
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
    ],
};

export const playerStatsColumnDefs: any = [
    { headerName: 'Row Number', field: 'row', filter: 'agNumberColumnFilter', enableValue: true, valueGetter: "node.rowIndex + 1" },
    {
        field: 'player', headerName: 'Name',
        cellRenderer: 'playerNameCellRenderer', filter: 'agTextColumnFilter',
        keyCreator: (params) => {
            return params.value.name;
        },
        filterParams: {
            valueGetter: params => {
                if (!params.data) { return; }
                return params.data.player.firstname + ' ' + params.data.player.lastname;
            }
        },
    },
    { field: 'player.age', headerName: 'Age', filter: 'agNumberColumnFilter' },
    { field: 'player.nationality', headerName: 'Nationality', filter: 'agTextColumnFilter', },
    {
        field: 'statistics.team', headerName: 'Club',
        cellRenderer: 'playerTeamNameCellRenderer', filter: 'agTextColumnFilter',
        keyCreator: (params) => {
            return params.value.name;
        },
        filterParams: {
            valueGetter: params => {
                if (!params.data) { return; }
                return params.data.statistics[0].team.name;
            }
        },
        cellRendererParams: (params) => {
            if (!params.data) { return; }
            return { value: params.data.statistics[0].team }
        },
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].team;
        }
    },
    {
        field: 'goals', headerName: 'Goals', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].goals.total;
        }
    },
    {
        field: 'assists', headerName: 'Assists', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].goals.assists;
        }
    },
    {
        field: 'appearences', headerName: 'Appearences', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].games.appearences;
        }
    },
    {
        field: 'minutes', headerName: 'Minutes', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].games.minutes;
        }
    },
    {
        field: 'minutes per goal', headerName: 'Minutes/Goal', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            if (!params.data.statistics[0].goals.total) {
                return null;
            }
            return (params.data.statistics[0].games.minutes / params.data.statistics[0].goals.total).toFixed(2);
        }
    },
    {
        field: 'minutes per assists', headerName: 'Minutes/Assists', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            if (!params.data.statistics[0].goals.assists) {
                return null;
            }
            return (params.data.statistics[0].games.minutes / params.data.statistics[0].goals.assists).toFixed(2);
        }
    },
    {
        field: 'yellow cards', headerName: 'Yellow Cards', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].cards.yellow;
        }
    },
    {
        field: 'red cards', headerName: 'Red Cards', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].cards.red;
        }
    },
]

export const playerStatsColumnDefsAll: any = playerStatsColumnDefs.concat([
    {
        field: 'height', headerName: 'Height', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data || !params.data.player.height) { return; }
            return parseInt(params.data.player.height.replace(/\D/g, ''));
        },
        valueFormatter: (params) => {
            if (!params.data || !params.data.player.height) { return; }
            return params.data.player.height;
        }
    },
    {
        field: 'weight', headerName: 'Weight', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data || !params.data.player.weight) { return; }
            return parseInt(params.data.player.weight.replace(/\D/g, ''));
        }, 
        valueFormatter: (params) => {
            if (!params.data || !params.data.player.weight) { return; }
            return params.data.player.weight;
        }
    },
    {
        field: 'substitutes in', headerName: 'Substituted In', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].substitutes.in;
        }
    },
    {
        field: 'substitutes out', headerName: 'Substituted Out', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].substitutes.out;
        }
    },
    {
        field: 'bench', headerName: 'Bench Appearences', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].substitutes.bench;
        }
    },
    {
        field: 'total shots', headerName: 'Total Shots', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].shots.total;
        }
    },
    {
        field: 'on target shots', headerName: 'Shots on Target', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].shots.on;
        }
    },
    {
        field: 'total passes', headerName: 'Total Passes', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].passes.total;
        }
    },
    {
        field: 'dribbles attempted', headerName: 'Dribbles Attempted', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].dribbles.attempts;
        }
    },
    {
        field: 'dribbles successful', headerName: 'Dribbles Successful', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].dribbles.success;
        }
    },
    {
        field: 'total duels', headerName: 'Total Duels', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].duels.total;
        }
    },
    {
        field: 'duels won', headerName: 'Duels Won', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].duels.won;
        }
    },
    {
        field: 'fouls drawn', headerName: 'Fouls Drawn', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].fouls.drawn;
        }
    },
    {
        field: 'fouls committed', headerName: 'Fouls Committed', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].fouls.committed;
        }
    },
    {
        field: 'total tackles', headerName: 'Total Tackles', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].tackles.total;
        }
    },
    {
        field: 'blocked tackles', headerName: 'Blocked Tackles', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].tackles.blocks;
        }
    },
    {
        field: 'interception tackles', headerName: 'Interception Tackles', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].tackles.interceptions;
        }
    },
    {
        field: 'penalties won', headerName: 'Penalties Won', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].penalty.won;
        }
    },
    {
        field: 'penalties committed', headerName: 'Penalties Committed', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].penalty.committed;
        }
    },
    {
        field: 'penalties scored', headerName: 'Penalties Scored', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].penalty.scored;
        }
    },
    {
        field: 'penalties missed', headerName: 'Penalties Missed', filter: 'agNumberColumnFilter', enableValue: true,
        valueGetter: (params) => {
            if (!params.data) { return; }
            return params.data.statistics[0].penalty.missed;
        }
    }
]);