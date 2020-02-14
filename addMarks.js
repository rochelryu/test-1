import React, { Component } from 'react';
import axios from 'axios';

import {
    Card, CardHeader, Divider, CardContent, Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';

import {
    Autocomplete
} from '@material-ui/lab';


import CircularProgress from '@material-ui/core/CircularProgress';




class AddMarks extends Component {

    constructor(props) {

        super(props)
        this.state = {
          schoolyear_id:'',
          classroom_id:'',
          term_id:'',
          schoolyearsList:[],
          classroomsList:[],
          termsList:[],
          classeLists:[],
          anglais:[],
          francais:[],
          histgeo:[],
          philo:[],
          maths:[],
          phych:[],
          svt:[],
          arts:[],
          eps:[],
          info:[],
          conduite:[]
          
        }
      }

       //get school year

  componentDidMount() {
    this.getClassesList();
    this.getSchoolyearsList();
    this.getTermsList();

  }

  //Function get classe list
  getClassesList() {
    axios.get('http://localhost:8000/api/classes').then(
      (res) => {
        this.setState({
          classroomsList:res.data.data,
          
        })
      }
    ).catch(err => console.log(err))
  }

  //function get school year list
  getSchoolyearsList() {
    axios.get('http://localhost:8000/api/schoolyears').then(
      (res) => {
        this.setState({
          schoolyearsList:res.data.data
        })
      }
    ).catch(err => console.log(err))
  }

  //function get school year list
  getTermsList() {
    axios.get('http://localhost:8000/api/terms').then(
      (res) => {
        this.setState({
            termsList:res.data.data
        })
      }
    ).catch(err => console.log(err))
  }


  //handle classe list

  handleClasseList = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/api/classelist?classroom_id=${this.state.classroom_id}&schoolyear_id=${this.state.schoolyear_id}`)
    .then((res) => {
      this.setState({
        classeLists: res.data
      })
      
        
      console.log(this.state.classeLists)
    })
    .catch(error => console.log(error))
  }

   handleChange =(e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }


  ///handle marks
  handleMarks = (e) => {
    e.preventDefault();
    const { anglais,francais, histgeo,philo,maths,phych,svt,arts,eps,info,conduite } = this.state;
    const credentials = {  anglais,francais, histgeo,philo,maths,phych,svt,arts,eps,info,conduite };
    
    console.log(credentials)
  }



    render() {

      let i = 1;

     /* let options = this.state.classList.map(function (result) {
                return result;
        }) 
        console.log(options) */

        console.log(this.state.classroom_id)
        console.log(this.state.schoolyear_id)
        return (
            <div>
            <Card>
              <form autoComplete="off" onSubmit={this.handleClasseList}>
                <CardHeader
                    subheader="Saisie de moyenne."
                    title="Moyennes"
                />
                <Divider/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                        <Autocomplete
                            id="schoolyear_id"
                            required
                            options={this.state.schoolyearsList}
                            getOptionLabel={option => option.schoolyear}
                            renderInput={params => (
                                <TextField {...params} label="Année Scolaire" variant="outlined" fullWidth />
                            )}

                            onChange={(event,value) => {
                                this.setState({
                                schoolyear_id: value.id
                                });
                            }}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Autocomplete
                                id="classroom_id"
                                required
                                options={this.state.classroomsList}
                                getOptionLabel={option => option.classroom}
                                renderInput={params => (
                                    <TextField {...params} label="Classe" variant="outlined" fullWidth />
                                )}

                                onChange={(event,value) => {
                                    this.setState({
                                    classroom_id: value.id
                                    });
                                }}
                                />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Autocomplete
                                id="term_id"
                                required
                                options={this.state.termsList}
                                getOptionLabel={option => option.term_name}
                                renderInput={params => (
                                    <TextField {...params} label="Trimestre" variant="outlined" fullWidth />
                                )}

                                onChange={(event,value) => {
                                    this.setState({
                                    term_id: value.id
                                    });
                                }}
                                />
                        </Grid>
                        
                        <Button
                            fullWidth
                            color="primary"
                            size="large"
                            type="submit"
                            variant="contained"
                            >
                            Valider
                        </Button>
                    </Grid>
                </CardContent>
                </form>
            </Card>
            
            <Card>
              <CardHeader
              subheader="liste de classe"
              title="Liste de classe"
              />
              <Divider/>
              <form autoComplete="off" onSubmit={this.handleMarks}>
              <CardContent>
                <Grid>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                          <TableCell>Nom & prénom(s)</TableCell>
                          <TableCell align="right">Ang</TableCell>
                          <TableCell align="right">Fr</TableCell>
                          <TableCell align="right">H-G</TableCell>
                          <TableCell align="right">Philo</TableCell>
                          <TableCell align="right">Maths</TableCell>
                          <TableCell align="right">Phy. Ch.</TableCell>
                          <TableCell align="right">SVT</TableCell>
                          <TableCell align="right">Arts</TableCell>
                          <TableCell align="right">EPS</TableCell>
                          <TableCell align="right">Info</TableCell>
                          <TableCell align="right">Conduite</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { this.state.classeLists.map(classeList => (

                        
                        <TableRow key={classeList.student_id}>
                            <TableCell component="th" scope="row"> { classeList.firstName }  &nbsp; &nbsp; {classeList.lastName} </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="anglais"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="francais"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="histgeo"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="philo"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="maths"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="phych"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="svt"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="arts"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="eps"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="info"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                            <TableCell align="right">
                            <TextField 
                              id="conduite"
                              variant="outlined" 
                              onChange={this.handleChange}
                              
                              />
                            </TableCell>
                        </TableRow> 
                      )  
                      )}
                    </TableBody>
                  </Table>
                  <Button
                      fullWidth
                      color="secondary"
                      size="large"
                      type="submit"
                      variant="contained"
                  >
                     Enregistrer
                   </Button>
                </Grid>
              </CardContent>
              </form>
            </Card>
            </div>
        )
    }
}

export default AddMarks
