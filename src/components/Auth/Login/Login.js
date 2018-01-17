import React, { Component } from 'react';
import Button from 'react-mdl/lib/Button';
import { Card, CardActions } from 'react-mdl/lib/Card';
import FontAwesome from 'react-fontawesome';
import '../../../App.css';
import '../../../index.css';
import GoogleMap from './GoogleMap';

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        webcam : false,
        imageSrc: '/images/dummy.png',
        file:'',
        captured: false,
        aadhar_card:'',
        accno:'',
        result:false,
        isMarkerShown:true,
        similarityScore:'',
        message:'',
        error:'',
        webVideo:false,
        recordVideo: null,
        src: null,
        uploadSuccess: null,
        uploading: false,
        params:null,
        loading:false
      }
    }
    render() {
      return (
        <span>
          <div className="inputFields">
          <div><img src="/images/mercedes.png" className='logo'/></div>
          <h3>Find Your Car</h3>
            <p>{this.state.error}</p>
          <Card shadow={0} style={{width: '350px', background: '#fff', margin: '50px auto'}}>
            <div className='dummyContainer'>
            <GoogleMap />
              </div>

              <CardActions border className='actions'>
                <span>
                  <Button onClick={this.undo} className='camera'>
                    {/*<FontAwesome
                      className='super-crazy-colors'
                      name='undo'
                      size='2x'
                    />*/}&nbsp;&nbsp;Navigate me to the car!
                  </Button>
              </span>

            </CardActions>
          </Card>
          {this.state.loading?
            <FontAwesome
            className='super-crazy-colors'
            name='spinner'
            spin
            size='2x'
          />:''}

        </div>
      </span>
      );
    }
}
export default Login;
