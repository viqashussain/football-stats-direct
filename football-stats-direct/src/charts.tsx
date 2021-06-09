import React, { Component } from 'react';
import { AgChartsReact } from 'ag-charts-react';

export default class ChartExample extends Component<{}, any> {
    data = [
        {
            quarter: 'Q1',
            spending: 450,
        },
        {
            quarter: 'Q2',
            spending: 560,
        },
        {
            quarter: 'Q3',
            spending: 600,
        },
        {
            quarter: 'Q4',
            spending: 700,
        },
    ];



    async componentWillReceiveProps(newProps) {

        if (!newProps.data) {
            return;
        }

        const scatterAxes = [
            {
                type: 'number',
                position: 'bottom',
            },
            {
                type: 'number',
                position: 'left',
            },
        ];

        await this.setState({
            ...this.state,
            options: {
                data: newProps.data,
                series: newProps.seriesData,
                navigator: {
                    enabled: true
                },
                autoSize: true
            },
        });

        if (newProps.seriesData[0].type === 'scatter') {
            await this.setState({
                ...this.state,
                options: {
                    ...this.state.options,
                    axes: scatterAxes
                }
            });
        }
        else {
            delete this.state.options.axes
            await this.setState({
                ...this.state,
                options: {
                    ...this.state.options
                }
            });
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            options: {
                series: [{
                    xKey: 'round',
                    yKey: 'teamName',
                }],
            },
        };
    }

    render() {
        return <AgChartsReact options={this.state.options} />;
    }
}