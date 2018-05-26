import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';



const styles = theme => ({
  root: {
    margin:'auto',
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class TextMobileStepper extends React.Component {
  
    state = {
      apiKey: 'abb7b530a5f40eb332cbdf3b626b9326',
      activeStep: 0,
      object: [],
      isLoading: false
 
  }
  componentDidMount() {
   
    const {apiKey} = this.state;

   fetch(`https://api.themoviedb.org/4/list/1?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
     
          this.setState({ object: data.results, isLoading: true});
    })
    .catch(err => console.log(err))
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const  maxSteps    = this.state.object.length;
    const tutorialSteps = this.state.object.map(item => (
            {
               label: item.title,
               imgPath: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                } 
          ));

    if(!this.state.isLoading) {
      return <p>Is Loading</p>
    }

     return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography><h3>{tutorialSteps[activeStep].label}</h3></Typography>
        </Paper>
        <img
          className={classes.img}
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        />  
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
