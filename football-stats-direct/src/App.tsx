import './App.css';
import { AgGridReact } from '@ag-grid-community/react';
import TeamNameCellRenderer from './custom-cell-renderers/TeamNameCellRenderer.js';
import React, { Component } from 'react';
import './../node_modules/@ag-grid-community/core/dist/styles/ag-grid.css';
import './../node_modules/@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import db from './firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { TopScorersSeriesDataScatter, TopScorersSeriesDataBar, DataDisplayType, GraphType, Leagues, leaguesIds, leagueStandingsColumnDefs, leagueStandingsColumnDefsAll, PlayerStats, playerStatsColumnDefs, playerStatsColumnDefsAll, ShowAllStats, StatsType, statusBar, AllPlayersSeriesDataScatter, MostAssistSeriesDataBar, MostAssistSeriesDataScatter, MostRedCardsSeriesDataBar, MostRedCardsSeriesDataScatter, MostYellowCardsSeriesDataBar, MostYellowCardsSeriesDataScatter, AllPlayersSeriesDataBar } from './data';
import FormCellRenderer from 'custom-cell-renderers/FormCellRenderer';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PlayerNameCellRenderer from 'custom-cell-renderers/PlayerNameCellRenderer';
import ChartExample from 'charts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { flattenObject } from 'helpers';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { About } from 'about';
import PlayerTeamNameCellRenderer from 'custom-cell-renderers/PlayerTeamNameCellRenderer copy';
import { LicenseManager } from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("CompanyName=T/A Viqas Hussain,LicensedGroup=T/A Viqas Hussain,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-016245,ExpiryDate=9_June_2022_[v2]_MTY1NDcyOTIwMDAwMA==1fe1806f4c1833622bb983af6ef92aeb");



class App extends Component<{}, any> {
  // rowData = eplLeagueStandings.response[0].league.standings[0];

  gridColumnApi;
  gridApi;

  currentLeagueSeason;

  defaultColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true,
    resizable: true,
    enablePivot: true
  }

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
    ],
  };

  getSeriesDataForFixtures(data: object) {
    const seriesData: any = [];
    for (let key in data) {
      if (key === 'round') {
        continue;
      }
      seriesData.push({
        type: 'line',
        xKey: 'round',
        yKey: key,
        yName: key
      })
    }
    return seriesData;
  }

  getSeriesDataForPlayers(stat: PlayerStats) {
    if (stat === PlayerStats.TopScorers) {
      if (this.state.selectedGraphType === GraphType.Bar) {
        return TopScorersSeriesDataBar;
      }
      else if (this.state.selectedGraphType === GraphType.Scatter) {
        return TopScorersSeriesDataScatter;
      }
    }
    else if (stat === PlayerStats.TopAssists) {
      if (this.state.selectedGraphType === GraphType.Bar) {
        return MostAssistSeriesDataBar;
      }
      else if (this.state.selectedGraphType === GraphType.Scatter) {
        return MostAssistSeriesDataScatter;
      }
    }
    else if (stat === PlayerStats.MostYellowCards) {
      if (this.state.selectedGraphType === GraphType.Bar) {
        return MostYellowCardsSeriesDataBar;
      }
      else if (this.state.selectedGraphType === GraphType.Scatter) {
        return MostYellowCardsSeriesDataScatter;
      }
    }
    else if (stat === PlayerStats.MostRedCards) {
      if (this.state.selectedGraphType === GraphType.Bar) {
        return MostRedCardsSeriesDataBar;
      }
      else if (this.state.selectedGraphType === GraphType.Scatter) {
        return MostRedCardsSeriesDataScatter;
      }
    }
    else if (stat === PlayerStats.All) {
      if (this.state.selectedGraphType === GraphType.Bar) {
        return AllPlayersSeriesDataBar;
      }
      else if (this.state.selectedGraphType === GraphType.Scatter) {
        return AllPlayersSeriesDataScatter;
      }
    }
    return null;
  }

  async setCurrentLeagueSeason() {
    const ref = db.collection('leaguesSeason').doc('39');
    const doc = await ref.get();
    const currentLeagueSeasonYear = JSON.parse(doc.data().data).currentLeagueSeason;
    this.currentLeagueSeason = `${currentLeagueSeasonYear}/${currentLeagueSeasonYear + 1}`;
  }

  async componentDidMount() {
    this.setCurrentLeagueSeason();
    const leaguesRef = db.collection('leagues').doc(Leagues.PremierLeague);
    const doc = await leaguesRef.get();
    const data = JSON.parse(doc.data().data);
    let leagueStandings = [];

    if (data.response.length) {
      leagueStandings = data.response[0].league.standings[0]
    }

    this.setState({
      ...this.state,
      rowData: leagueStandings,
      dataIsLoading: false,
      selectedLeague: Leagues.PremierLeague,
      columnDefs: this.getColumnDefs(),
      dataDisplayType: DataDisplayType.Grid
    });

    this.sortByPointsDesc();

    // db.collection("leagues")
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     this.setState({
    //       ...this.state,
    //       rowData: JSON.parse(JSON.parse(data[0].data)).response[0].league.standings[0],
    //       dataIsLoading: false
    //     })
    //   });

    await this.getFixturesChartData(Leagues.PremierLeague);
  }

  async getPlayerStatsChartData(league: string, playerStat: PlayerStats) {
    this.setState({
      ...this.state,
      dataIsLoading: true
    })

    let selectedLeagueId: any;
    if (this.state.selectedLeague != Leagues.All) {
      selectedLeagueId = leaguesIds.find(x => x.name === this.state.selectedLeague)!.id;
    }

    let chartData = [];
    if (playerStat === PlayerStats.All) {
      if (selectedLeagueId) {
        const playerStatsRef = db.collection('allPlayers')
        const docs = await playerStatsRef.get();
        const leagueSpecificDocs = docs.docs.filter(x => x.id.startsWith(selectedLeagueId));
        leagueSpecificDocs.forEach(x => {
          chartData = chartData.concat(JSON.parse(x.data().data));
        });
        // chartData = JSON.parse(doc.data().data);
      }
      else {
        const playerStatsRef = db.collection('allPlayers')
        const doc = await playerStatsRef.get();
        const statSpecificDocs = doc.docs;
        statSpecificDocs.forEach(x => {
          chartData = chartData.concat(JSON.parse(x.data().data));
        });
      }
    }
    else {
      if (selectedLeagueId) {
        const playerStatsRef = db.collection('playerStats').doc(`${playerStat}-${selectedLeagueId}`);
        const doc = await playerStatsRef.get();
        chartData = JSON.parse(doc.data().data).response;
      }
      else {
        const playerStatsRef = db.collection('playerStats')
        const doc = await playerStatsRef.get();
        const statSpecificDocs = doc.docs.filter(x => x.id.startsWith(playerStat));
        statSpecificDocs.forEach(x => {
          chartData = chartData.concat(JSON.parse(x.data().data).response);
        });
      }
    }

    const processedData: any = [];
    chartData.map((x: any) => {
      const myObject = x.statistics[0];
      myObject.player = x.player;
      const flattenedObject = flattenObject(myObject);
      processedData.push(flattenedObject);
    });

    const seriesData = this.getSeriesDataForPlayers(playerStat);

    function propComparator(prop: any) {
      return function (a, b) {
        if (prop[0].yKeys) {
          return b[prop[0].yKeys[0]] - a[prop[0].yKeys[0]];
        }
        else {
          return b[prop[0].yKey[0]] - a[prop[0].yKey[0]];
        }
      }
    }


    const orderedData = processedData.sort(propComparator(seriesData));

    this.fixturesChartDataWithoutFilter = orderedData;

    this.setState({
      ...this.state,
      seriesData,
      fixturesChartData: orderedData,
      dataIsLoading: false,
      selectedPlayerStat: playerStat,
      columnDefs: this.getColumnDefs()
    });

    if (this.state.selectedTeamFilterName) {
      this.filterGridDataForPlayerStats(this.state.selectedTeamFilterName);
    }
  }

  extractTeamFromData(playersArray: any[]) {
    return playersArray.map(x => x.statistics[0].team).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
  }

  async getFixturesChartData(league: string) {
    this.setState({
      ...this.state,
      dataIsLoading: true
    })

    let chartData: any = [];

    if (league != Leagues.All) {
      const fixturesRef = db.collection('fixtures').doc(league);
      const doc = await fixturesRef.get();
      chartData = JSON.parse(doc.data().data);
    }
    else {
      const fixturesRef = db.collection('fixtures');
      const doc = await fixturesRef.get();
      doc.docs.forEach(x => {
        chartData = this.mergeArrayByRound(chartData, JSON.parse(x.data().data));
      });
    }

    const seriesData = this.getSeriesDataForFixtures(chartData.find(x => x.round === 'Regular Season - 1'));

    this.fixturesChartDataWithoutFilter = chartData;

    this.setState({
      ...this.state,
      seriesData: seriesData,
      fixturesChartData: chartData,
      dataIsLoading: false
    });
  }

  mergeArrayByRound(oldArray: any[], newArray: any[]) {
    if (!oldArray.length) {
      return newArray;
    }
    newArray.forEach(x => {
      let roundIndex = oldArray.findIndex(y => y.round === x.round);
      for (let key in x) {
        if (key === 'round') {
          continue;
        }
        if (roundIndex === -1) {
          oldArray.push({ round: x.round });
          roundIndex = oldArray.findIndex(y => y.round === x.round);
        }
        oldArray[roundIndex][key] = x[key];
      }
    });
    return oldArray;
  }

  async updateGridDataForLeague(league: string) {
    this.setState({
      ...this.state,
      dataIsLoading: true
    })

    let rowData = [];

    if (league != Leagues.All) {
      const leaguesRef = db.collection('leagues').doc(league);
      const doc = await leaguesRef.get();
      if (JSON.parse(doc.data().data).response.length) {
        rowData = JSON.parse(doc.data().data).response[0].league.standings[0]
      }
    }
    else {
      const leaguesRef = db.collection('leagues')
      const doc = await leaguesRef.get();

      doc.docs.forEach(x => {
        const jsonParsed = JSON.parse(x.data().data);
        if (jsonParsed.response.length) {
          rowData = rowData.concat(jsonParsed.response[0].league.standings[0]);
        }
      });
    }

    await this.setState({
      ...this.state,
      rowData: rowData,
      dataIsLoading: false,
      selectedLeague: league,
      columnDefs: this.getColumnDefs()
    });

    this.sortByPointsDesc();
  }

  async updateGridForPlayerStats(playerStat: PlayerStats) {
    await this.setState({
      ...this.state,
      dataIsLoading: true,
      selectedPlayerStat: playerStat,
    });

    let selectedLeagueId: any;
    if (this.state.selectedLeague != Leagues.All) {
      selectedLeagueId = leaguesIds.find(x => x.name === this.state.selectedLeague)!.id;
    }

    let rowData = [];
    let availableTeamsToFilterBy;
    if (playerStat === PlayerStats.All) {
      if (selectedLeagueId) {
        const playerStatsRef = db.collection('allPlayers')
        const docs = await playerStatsRef.get();
        const leagueSpecificDocs = docs.docs.filter(x => x.id.startsWith(selectedLeagueId));
        leagueSpecificDocs.forEach(x => {
          rowData = rowData.concat(JSON.parse(x.data().data));
        });
      }
      else {
        const playerStatsRef = db.collection('allPlayers')
        const doc = await playerStatsRef.get();
        const statSpecificDocs = doc.docs;
        statSpecificDocs.forEach(x => {
          rowData = rowData.concat(JSON.parse(x.data().data));
        });
      }
    }
    else {
      if (selectedLeagueId) {
        const playerStatsRef = db.collection('playerStats').doc(`${playerStat}-${selectedLeagueId}`);
        const doc = await playerStatsRef.get();
        rowData = JSON.parse(doc.data().data).response;
      }
      else {
        const playerStatsRef = db.collection('playerStats')
        const doc = await playerStatsRef.get();
        const statSpecificDocs = doc.docs.filter(x => x.id.startsWith(playerStat));
        statSpecificDocs.forEach(x => {
          rowData = rowData.concat(JSON.parse(x.data().data).response);
        });
      }
    }

    availableTeamsToFilterBy = this.extractTeamFromData(rowData);

    const columnDefs = this.getColumnDefs();

    await this.setState({
      ...this.state,
      rowData: rowData,
    });

    await this.setState({
      ...this.state,
      columnDefs: columnDefs,
      rowData: rowData,
      dataIsLoading: false,
      availableTeamsToFilterBy: availableTeamsToFilterBy
    });
  }

  getColumnDefs() {
    // get player stat column defs
    if (this.state.selectedPlayerStat) {
      if (this.state.showAllStats === ShowAllStats.All) {
        return playerStatsColumnDefsAll;
      }
      else {
        return playerStatsColumnDefs;
      }
    }
    // get league column defs
    else {
      if (this.state.showAllStats === ShowAllStats.All) {
        return leagueStandingsColumnDefsAll;
      }
      else {
        return leagueStandingsColumnDefs;
      }
    }
  }

  async updateGridDataMaster(type: StatsType, stat: PlayerStats | Leagues, showGraphChanged: boolean = false) {

    // set the league in the state so it can be used later
    if (type === StatsType.League) {
      await this.setState({
        ...this.state,
        selectedLeague: stat,
        availableTeamsToFilterBy: null,
        selectedTeamFilterName: null
      });
    };

    await this.setState({
      ...this.state,
      availableTeamsToFilterBy: null,
    });

    if (!showGraphChanged) {
      await this.setState({
        ...this.state,
        selectedTeamFilterName: null
      });
    }

    // deselect player stat if it is already selected
    // also set the teams to filter by to nothing as you will now be showing league stats
    if (type === StatsType.Player && this.state.selectedPlayerStat === stat && !showGraphChanged) {
      await this.setState({
        ...this.state,
        selectedPlayerStat: null
      });

      type = StatsType.League;
      stat = this.state.selectedLeague;
    };

    //do we need to get table data or graph data?
    if (this.state.dataDisplayType === DataDisplayType.Graph) {
      if (type === StatsType.League) {
        if (!this.state.selectedPlayerStat) {
          await this.getFixturesChartData(this.state.selectedLeague);
        }
        else {
          await this.getPlayerStatsChartData(this.state.selectedLeague, this.state.selectedPlayerStat);
        }
      }
      else if (type === StatsType.Player) {
        await this.getPlayerStatsChartData(this.state.selectedLeague, stat as any);
      }
      return;
    }
    else {
      if (type === StatsType.Player) {
        this.updateGridForPlayerStats(stat as PlayerStats);
      }
      else if (this.state.selectedPlayerStat != null) {
        await this.updateGridForPlayerStats(this.state.selectedPlayerStat);
      }
      else {
        await this.updateGridDataForLeague(stat);
      }
    }
  }

  async filterByTeam(team: { id: number, name: string }) {

    // deselect if already seleced
    if (team.name === this.state.selectedTeamFilterName) {
      await this.setState({
        ...this.state,
        selectedTeamFilterName: null,
        fixturesChartData: this.fixturesChartDataWithoutFilter
      });

      if (this.state.dataDisplayType === DataDisplayType.Graph) {
        await this.setState({
          ...this.state,
          fixturesChartData: this.fixturesChartDataWithoutFilter
        });
        await this.filterGridDataForPlayerStats(this.state.selectedTeamFilterName);
      }
      this.gridApi.destroyFilter('statistics.team');
      return;
    }
    await this.setState({
      ...this.state,
      selectedTeamFilterName: team.name
    });

    if (this.state.dataDisplayType === DataDisplayType.Graph) {
      await this.filterGridDataForPlayerStats(this.state.selectedTeamFilterName);
    }

    this.filterPlayerDataByTeam();
  }

  filterPlayerDataByTeam() {
    if (this.state.selectedTeamFilterName) {
      const filter = {
        'statistics.team': {
          filterType: 'text',
          type: 'contains',
          filter: [this.state.selectedTeamFilterName]
        }
      }
      this.gridApi.setFilterModel(filter);
    }
  }

  fixturesChartDataWithoutFilter;

  async filterGridDataForPlayerStats(selectedTeamFilterName: string) {
    if (selectedTeamFilterName === null) {
      await this.setState({
        ...this.state,
        fixturesChartData: this.fixturesChartDataWithoutFilter
      });

      return;
    }

    const updatedFixtureChartData = this.state.fixturesChartData.filter(x => x.teamname === selectedTeamFilterName);

    await this.setState({
      ...this.state,
      fixturesChartData: updatedFixtureChartData
    });
  }

  sortByPointsDesc() {
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'points',
          sort: 'desc',
        },
      ],
    });
  }

  async showGraphChanged(event) {
    const dataDisplayType = event.target.checked ? DataDisplayType.Graph : DataDisplayType.Grid;
    await this.setState({
      ...this.state,
      dataDisplayType: dataDisplayType
    });

    if (dataDisplayType === DataDisplayType.Graph) {
      //player stats has been selected, so go display that in a graph
      if (this.state.selectedPlayerStat) {
        this.getPlayerStatsChartData(this.state.selectedLeague, this.state.selectedPlayerStat);
      }
      //else league graph has been selected
      else {
        this.getFixturesChartData(this.state.selectedLeague);
      }
    }
    //grid has been selected
    else {
      if (this.state.selectedPlayerStat) {
        this.updateGridDataMaster(StatsType.Player, this.state.selectedPlayerStat, true);
      }
      //else league graph has been selected
      else {
        this.updateGridDataMaster(StatsType.League, this.state.selectedLeague, true);
      }
    }

    this.filterPlayerDataByTeam();
  }

  async updateGraphType(graphType: GraphType) {
    await this.setState({
      ...this.state,
      selectedGraphType: graphType
    });

    let seriesData;
    if (this.state.selectedPlayerStat) {
      seriesData = this.getSeriesDataForPlayers(this.state.selectedPlayerStat);
    }
    else {
      seriesData = this.getSeriesDataForFixtures(this.state.fixturesChartData.find(x => x.round === 'Regular Season - 1'));
    }

    await this.setState({
      ...this.state,
      seriesData: seriesData
    });
  }

  async showAllStatsChanged(event) {
    const showAllStats = event.target.checked ? ShowAllStats.All : ShowAllStats.Simple;
    await this.setState({
      ...this.state,
      showAllStats: showAllStats,
    });

    await this.setState({
      ...this.state,
      columnDefs: this.getColumnDefs()
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      dataIsLoading: true,
      rowData: [],
      frameworkComponents: {
        playerTeamNameCellRenderer: PlayerTeamNameCellRenderer,
        teamNameCellRenderer: TeamNameCellRenderer,
        playerNameCellRenderer: PlayerNameCellRenderer,
        formCellRenderer: FormCellRenderer
      },
      autoGroupColumnDef: { minWidth: 250, cellRendererParams: { innerRenderer: 'teamNameCellRenderer' } },
      modules: AllModules,
      selectedTeamFilterName: null,
      selectedGraphType: GraphType.Bar
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  render() {
    return (
      <div className='app-root-container'>

        <Router>
          <Redirect from="/" exact to="/home" />


          <Backdrop className='backdrop' open={this.state.dataIsLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Route path="/home">

            <AppBar position="static">
              <Toolbar className="tool-bar">
                <div className={'logo-container'}>
                  <img className='header-logo' alt="logo" src={'https://i.ibb.co/mNY1HNK/logo.png'} />

                </div>

                <div className={'nav-container'}>
                  <Link className={'link'} to="/home"><Button className={'nav-button'} color="primary">Home</Button></Link>
                  <Link className={'link'} to="/about"><Button className={'nav-button'} color="inherit">About</Button></Link>
                </div>

                <span className={'current-season'}>Current Season: {this.currentLeagueSeason}</span>

                {this.state.dataDisplayType === DataDisplayType.Graph && this.state.selectedPlayerStat ?
                  (
                    <ButtonGroup className='graph-button-group fullWidth' size="small" color="primary" aria-label="small outlined primary button group">
                      <Button className={`graph-type-button ${this.state.selectedGraphType == GraphType.Bar ? 'button-selected' : ''}`}
                        onClick={async () => this.updateGraphType(GraphType.Bar)} variant="outlined" color="primary">
                        <EqualizerIcon />
                      </Button>
                      <Button className={`graph-type-button ${this.state.selectedGraphType == GraphType.Scatter ? 'button-selected' : ''}`}
                        onClick={async () => this.updateGraphType(GraphType.Scatter)} variant="outlined" color="primary">
                        <ScatterPlotIcon />
                      </Button>
                    </ButtonGroup>
                  ) : null}

                <FormControlLabel
                  control={<Switch className="show-graph-switch" checked={this.state.dataDisplayType === DataDisplayType.Graph} onChange={this.showGraphChanged.bind(this)} name="Show Graph" />}
                  label="Show Graph"
                />

                <FormControlLabel
                  control={<Switch className="show-graph-switch" checked={this.state.showAllStats === ShowAllStats.All} onChange={this.showAllStatsChanged.bind(this)} name="Show All Stats" />}
                  label="Show All Stats"
                />
              </Toolbar>
            </AppBar>

            <div>


              <Card variant="outlined">
                <CardContent className="league-button-card-content">
                  <div className={'button-explanatory-text'}>Select League to view standings</div>
                  <ButtonGroup className='button-group' size="large" color="primary" aria-label="large outlined primary button group">
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.All ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.All)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://img.uefa.com/imgml/uefaorg/new/logo.png" alt="premier league" />
                      Top 5 European Leagues
                    </Button>
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.PremierLeague ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.PremierLeague)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://media.api-sports.io/football/leagues/39.png" alt="premier league" />
                      English Premier League
                    </Button>
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.LaLiga ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.LaLiga)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://media.api-sports.io/football/leagues/140.png" alt="la liga" />
                      La Liga
                    </Button>
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.SerieA ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.SerieA)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://media.api-sports.io/football/leagues/135.png" alt="serie a" />
                      Serie A
                    </Button>
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.Ligue1 ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.Ligue1)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://media.api-sports.io/football/leagues/61.png" alt="ligue 1" />
                      Ligue 1
                    </Button>
                    <Button className={`league-button ${this.state.selectedLeague == Leagues.Bundesliga ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.League, Leagues.Bundesliga)} variant="outlined" color="primary">
                      <img className='league-logo' src="https://media.api-sports.io/football/leagues/78.png" alt="bundesliga" />
                      Bundesliga
                    </Button>
                  </ButtonGroup>
                </CardContent>

                <CardContent className={'player-stats-card-content'}>

                  <div className={'button-explanatory-text'}>Select individual player stats</div>
                  <ButtonGroup className='button-group' size="large" color="primary" aria-label="large outlined primary button group">
                    <Button className={`player-stats-button ${this.state.selectedPlayerStat == PlayerStats.All ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.Player, PlayerStats.All)} variant="outlined" color="primary">
                      {/* <img className='league-logo' src="https://img.uefa.com/imgml/uefaorg/new/logo.png" alt="premier league" /> */}
                      All Players
                    </Button>
                    <Button className={`player-stats-button ${this.state.selectedPlayerStat == PlayerStats.TopScorers ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.Player, PlayerStats.TopScorers)} variant="outlined" color="primary">
                      {/* <img className='league-logo' src="https://img.uefa.com/imgml/uefaorg/new/logo.png" alt="premier league" /> */}
                      Top 20 Scorers
                    </Button>
                    <Button className={`player-stats-button ${this.state.selectedPlayerStat == PlayerStats.TopAssists ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.Player, PlayerStats.TopAssists)} variant="outlined" color="primary">
                      {/* <img className='league-logo' src="https://media.api-sports.io/football/leagues/39.png" alt="premier league" /> */}
                      Top 20 Most Assists
                    </Button>
                    <Button className={`player-stats-button ${this.state.selectedPlayerStat == PlayerStats.MostYellowCards ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.Player, PlayerStats.MostYellowCards)} variant="outlined" color="primary">
                      {/* <img className='league-logo' src="https://img.uefa.com/imgml/uefaorg/new/logo.png" alt="premier league" /> */}
                      Top 20 Most Yellow Cards
                    </Button>
                    <Button className={`player-stats-button ${this.state.selectedPlayerStat == PlayerStats.MostRedCards ? 'button-selected' : ''}`}
                      onClick={async () => this.updateGridDataMaster(StatsType.Player, PlayerStats.MostRedCards)} variant="outlined" color="primary">
                      {/* <img className='league-logo' src="https://media.api-sports.io/football/leagues/39.png" alt="premier league" /> */}
                      Top 20 Most Red Cards
                    </Button>

                  </ButtonGroup>
                </CardContent>

                {this.state.availableTeamsToFilterBy ?
                  (
                    <CardContent>
                      <div className={'button-explanatory-text'}>Filter by team</div>
                      <ButtonGroup className='button-group teams-button-group fullWidth' size="small" color="primary" aria-label="small outlined primary button group">
                        {this.state.availableTeamsToFilterBy.map(x => {
                          return (<Button key={x.id} className={`team-filter-button ${this.state.selectedTeamFilterName == x.name ? 'button-selected' : ''}`}
                            onClick={async () => this.filterByTeam(x)} variant="outlined" color="primary">
                            <img className='club-logo' src={x.logo} alt={x.name} />
                            {/* {x.name} */}
                          </Button>)
                        })}
                      </ButtonGroup>
                    </CardContent>
                  ) : null}

              </Card>
            </div>

            <Card className='grid-card' variant="outlined">
              <CardContent style={{ height: '100%' }}>
                <div className='chart-container' style={{ display: this.state.dataDisplayType === DataDisplayType.Graph ? 'block' : 'none' }}>
                  <ChartExample {...{ data: this.state.fixturesChartData, seriesData: this.state.seriesData }} />
                </div>
                <div style={{ display: this.state.dataDisplayType === DataDisplayType.Grid ? 'block' : 'none' }} className="ag-theme-alpine grid-container">

                  <AgGridReact
                    rowData={this.state.rowData}
                    columnDefs={this.state.columnDefs}
                    frameworkComponents={this.state.frameworkComponents}
                    modules={this.state.modules}
                    defaultColDef={this.defaultColDef}
                    animateRows={true}
                    pivotPanelShow={'onlyWhenPivoting'}
                    rowGroupPanelShow={'always'}
                    statusBar={statusBar}
                    rowSelection='multiple'
                    enableRangeSelection={true}
                    sideBar={this.sideBar}
                    enableCharts={true}
                    // autoGroupColumnDef={this.state.autoGroupColumnDef}
                    onGridReady={this.onGridReady}
                  >
                  </AgGridReact>

                </div>
              </CardContent>
            </Card>
          </Route>

          <RouterSwitch>
            <Route path="/about">
              <About />
            </Route>
          </RouterSwitch>

        </Router>

      </div>
    );
  }
};


export default App;