import React from 'react';
import Statistic from './statistic';
import StatisticsSearch from './statistics-search';
import StatisticsChart from './statistics-chart';
import NestedStatistics from './nested-statistics';

class Statistics extends React.Component {
  static get propTypes() {
    return {
      token: React.PropTypes.string.isRequired,
      startDate: React.PropTypes.string.isRequired,
      endDate: React.PropTypes.string.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      statistics: {
        commercialProjects: [],
        maintenanceProjects: [],
        internalProjects: [],
        projectsEndingThisMonth: [],
        beginningNextMonthProjects: [],
        seniorAndroidDevs: [],
        seniorIosDevs: [],
        seniorRorDevs: [],
        androidDevs: [],
        iosDevs: [],
        rorDevs:[],
        developersInInternals: [],
        juniorsAndInterns: [],
        nonBillableInCommercialProjects: [],
      }
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFetchDataDone = this.onFetchDataDone.bind(this);
  }

  componentDidMount() {
    this.fetchStatistics(this.props.startDate, this.props.endDate)
  }

  fetchStatistics(startDate, endDate) {
    $.ajax({
      url: Routes.api_v2_statistics_path(),
      dataType: 'json',
      data: {
        startDate: startDate,
        endDate: endDate,
        token: this.props.token
      }
    }).done(this.onFetchDataDone).fail(this.onFetchDataFail);
  }

  onFetchDataDone(data, textStatus, jqXHR) {
    this.setState({statistics: data});
  }

  onFetchDataFail(xhr, status, err) {
    console.error(Routes.api_v2_statistics_path(), status, err.toString());
  }

  onFormSubmit(startDate, endDate) {
    this.fetchStatistics(startDate, endDate);
  }

  render() {
    return (
      <div>
        <StatisticsSearch onFormSubmit={this.onFormSubmit} format='YYYY-MM-DD'
          initStartDate={this.props.startDate} initEndDate={this.props.endDate}/>
        <h3>Projects</h3>
        <StatisticsChart
          commercial={this.state.statistics.commercialProjects.length}
          maintenance={this.state.statistics.maintenanceProjects.length}
          internal={this.state.statistics.internalProjects.length}/>
        <table className='table'>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Number</th>
            </tr>
          </thead>
          <Statistic
            name='Commercial projects'
            detailsArray={this.state.statistics.commercialProjects}/>
          <Statistic
            name='Internal projects'
            detailsArray={this.state.statistics.internalProjects}/>
          <Statistic
            name='Projects under maintenance'
            detailsArray={this.state.statistics.maintenanceProjects}/>
          <Statistic
            name='Projects with end date'
            detailsArray={this.state.statistics.projectsEndingThisMonth}/>
          <Statistic
            name='Potential projects in next 30 days'
            detailsArray={this.state.statistics.beginningNextMonthProjects}/>
        </table>
        <h3>People</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Number</th>
            </tr>
          </thead>
          <NestedStatistics
            name='Billable developers'
            statisticsArrays={[
              {name: 'Senior android devs', people: this.state.statistics.seniorAndroidDevs},
              {name: 'Senior iOS devs', people: this.state.statistics.seniorIosDevs},
              {name: 'Senior RoR devs', people: this.state.statistics.seniorRorDevs},
              {name: 'Android devs', people: this.state.statistics.androidDevs},
              {name: 'iOS devs', people: this.state.statistics.iosDevs},
              {name: 'RoR devs', people: this.state.statistics.rorDevs},
            ]}/>
          <Statistic
            name='Developers in internals'
            detailsArray={this.state.statistics.developersInInternals}/>
          <Statistic
            name='Non-billable developers in commercial projects'
            detailsArray={this.state.statistics.nonBillableInCommercialProjects}/>
          <Statistic
            name='Juniors and interns'
            detailsArray={this.state.statistics.juniorsAndInterns}/>
        </table>
      </div>
    );
  }
}

export default Statistics;