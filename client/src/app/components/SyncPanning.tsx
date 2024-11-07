// import React, { useEffect } from 'react';
// import Highcharts from 'highcharts';
// import Dashboards from '@highcharts/dashboards';

// export default function PopulationDashboard() {
//   const data = [
//     ['Delhi', 31.18, 1484, 250],
//     ['Tokyo', 37.33, 2194, 2017],
//     ['Shanghai', 27.79, 14922, 118],
//     ['Sao Paulo', 22.23, 7946, 760],
//     ['Mexico City', 21.91, 1485, 3930],
//     ['Dhaka', 21.74, 2161, 32],
//     ['Cairo', 21.32, 2734, 23],
//     ['Beijing', 20.89, 12796, 2303],
//     ['Mumbai', 20.67, 4355, 14],
//     ['Osaka', 19.11, 225, 3],
//     ['Karachi', 16.45, 3530, 10],
//     ['Chongqing', 16.38, 5472, 2797],
//     ['Istanbul', 15.41, 5343, 537],
//     ['Buenos Aires', 15.25, 4758, 25],
//     ['Kolkata', 14.974, 1886, 9],
//     ['Kinshasa', 14.97, 9965, 240],
//     ['Lagos', 14.86, 2706, 41],
//     ['Manila', 14.16, 619, 108],
//     ['Tianjin', 13.79, 5609, 1078],
//     ['Guangzhou', 13.64, 19870, 21]
//   ];

//   useEffect(() => {
//     Highcharts.setOptions({
//       chart: {
//         styledMode: true
//       }
//     });

//     Dashboards.board('container', {
//       dataPool: {
//         connectors: [{
//           id: 'Population',
//           type: 'JSON',
//           options: {
//             columnNames: [
//               'City', 'Population (mln)', 'Metro Area (km²)',
//               'Highest Elevation (m)'
//             ],
//             firstRowAsNames: false,
//             data
//           }
//         }]
//       },
//       gui: {
//         layouts: [{
//           rows: [{
//             cells: [{ id: 'dashboard-col-0' }, { id: 'dashboard-col-1' }, { id: 'dashboard-col-2' }]
//           }, {
//             cells: [{ id: 'dashboard-col-3' }]
//           }]
//         }]
//       },
//       components: [{
//         title: { text: 'Population' },
//         sync: { extremes: true },
//         connector: {
//           id: 'Population',
//           columnAssignment: [{
//             seriesId: 'Population (mln)',
//             data: ['City', 'Population (mln)']
//           }]
//         },
//         renderTo: 'dashboard-col-0',
//         type: 'Highcharts',
//         chartOptions: {
//           xAxis: {
//             type: 'category',
//             accessibility: { description: 'Cities' }
//           },
//           yAxis: { title: { text: '' } },
//           credits: { enabled: false },
//           chart: { type: 'bar', zooming: { type: 'x' } },
//           plotOptions: { series: { colorByPoint: true } },
//           tooltip: { pointFormat: '<b>{point.y:.2f}</b> mln', stickOnContact: true },
//           legend: { enabled: false },
//           accessibility: { description: 'The chart displays Population of cities in millions.' }
//         }
//       },
//       {
//         title: { text: 'Metropolitan Area' },
//         sync: { extremes: true },
//         connector: {
//           id: 'Population',
//           columnAssignment: [{
//             seriesId: 'Metro Area (km²)',
//             data: ['City', 'Metro Area (km²)']
//           }]
//         },
//         renderTo: 'dashboard-col-1',
//         type: 'Highcharts',
//         chartOptions: {
//           xAxis: { type: 'category', accessibility: { description: 'Cities' } },
//           yAxis: { title: { text: '' } },
//           credits: { enabled: false },
//           chart: { type: 'bar', zooming: { type: 'x' } },
//           plotOptions: { series: { colorByPoint: true } },
//           tooltip: { pointFormat: '<b>{point.y}</b> km²', stickOnContact: true },
//           legend: { enabled: false },
//           accessibility: { description: 'The chart displays Metropolitan area in km².' }
//         }
//       },
//       {
//         title: { text: 'Highest Elevation' },
//         sync: { extremes: true },
//         connector: {
//           id: 'Population',
//           columnAssignment: [{
//             seriesId: 'Highest Elevation (m)',
//             data: ['City', 'Highest Elevation (m)']
//           }]
//         },
//         renderTo: 'dashboard-col-2',
//         type: 'Highcharts',
//         chartOptions: {
//           xAxis: { type: 'category', accessibility: { description: 'Cities' } },
//           yAxis: { title: { text: '' } },
//           credits: { enabled: false },
//           chart: { type: 'bar', zooming: { type: 'x' } },
//           plotOptions: { series: { colorByPoint: true } },
//           tooltip: { pointFormat: '<b>{point.y}</b> m', stickOnContact: true },
//           legend: { enabled: false },
//           accessibility: { description: 'The chart displays Highest Elevation in meters.' }
//         }
//       },
//       {
//         renderTo: 'dashboard-col-3',
//         connector: { id: 'Population' },
//         type: 'DataGrid',
//         sync: { extremes: true },
//         dataGridOptions: { credits: { enabled: false } }
//       }]
//     }, true);
//   }, []);

//   return (
//     <div id="container" />
//   );
// }
