import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {
    Link
} from "react-router-dom";
import ReactDOM from 'react-dom';
import GifPlayer from 'react-gif-player';


export function About() {
    return (
        <div className='about-container'>
            <AppBar position="static">
                <Toolbar className="tool-bar">
                    <div className={'logo-container'}>
                        <img className='header-logo' alt="logo" src={'https://i.ibb.co/mNY1HNK/logo.png'} />

                    </div>

                    <div className={'nav-container'}>
                        <Link className={'link'} to="/home"><Button className={'nav-button'} color="primary">Home</Button></Link>
                        <Link className={'link'} to="/about"><Button className={'nav-button'} color="inherit">About</Button></Link>
                    </div>

                </Toolbar>
            </AppBar>

            <Card>
                <CardContent>
                    <p>Welcome to FootballStatsDirect. </p>
                    <p>This is a small side project started by myself Viqas Hussain to showcase AG Grid's ability to analyse data and more specifically, football statistics.
                    One of the reasons I decided to build this app is the ability to compare teams and players from all across Europe's top 5 leagues.
                    Now you can finally answer those all important questions you've been asking such as which team in Europe has scored the most goals and where they rank against other European sides;
                    what is the average weight and height of each player on each team; players of which nationality receive the most yellow cards? etc. </p>
                    <p>This app was built using React and Firebase. The data is live and is refreshed on a daily basis. The data is displayed using <a href="https://www.ag-grid.com/">AG Grid</a>: The Best JavaScript Grid in the World!
                    Using AG Grid, you can perform data visualization (e.g. Grouping and Pivot) within the Grid in addition to viewing the data either in the pre-created charts or creating your own from the data set. Below are a few
                    examples of the data the data visualization you can perform with AG Grid:
                    </p>

                    <div className='examples-container'>
                        <Grid container spacing={3}>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>View Serie A cumulative points accumulation</b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/1ca84cec0377df6f2.gif" still="https://i.ibb.co/XkTYGFg/1.jpg" />
                                        {/* <GifPlayer gif="https://s6.gifyu.com/images/1ca84cec0377df6f2.gif" />\ */}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>View the top 20 top scorers for the top 5 European leagues in a scatter graph. </b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/225abb7edef244e1c.gif" still="https://i.ibb.co/7Q1Z1MG/2.jpg"/>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>View all available stats for players in the Bundesliga.</b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/2.5.gif" still="https://i.ibb.co/1K4CqFh/2-5.jpg"/>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>See players of which nationality have the highest number of red cards and highest number of yellow cards from 
                                            the top 5 European leagues. 
                                        </b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/37ac17fcd9d7f2a12.gif" still="https://i.ibb.co/YL3qG5S/3.jpg"/>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>View goal contributions split (goals and assists) for Real Madrid in a bar graph.</b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/436cc4fdcaf1c33b6.gif" still="https://i.ibb.co/XjbT6cB/4.jpg"/>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card>
                                    <CardContent>
                                        <b>Pivot on player Nationality and group by Club to view goal contributions to each club by Nationality.</b>
                                        <GifPlayer gif="https://s6.gifyu.com/images/55fad961b7ccbed12.gif" still="https://i.ibb.co/ZXJ0yby/5.jpg"/>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </div>

                </CardContent>
            </Card>
        </div >
    )
}