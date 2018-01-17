import React, { Component } from 'react';
import Button from 'react-mdl/lib/Button';
import FontAwesome from 'react-fontawesome';
import './App.css';
import './index.css';
import 'whatwg-fetch';

class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        file:'',
        result:false,
        similarityScore:'',
        message:'',
        errorMsg:'',
        src: null,
        uploadSuccess: null,
        uploading: false,
        params:null,
        loading:false,
        name:'',
        imagePreviewUrl:'',
        phone:'',
        profile:'',
        uname:'',
        cvv:'',
        exp_date:'',
        card_no:''
      }
      this.submitForm = this.submitForm.bind(this);
      this.addProfilePicture = this.addProfilePicture.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    addProfilePicture=(e)=>{

      this.refs.fileUploader.click();

    }

    onChange=(event)=>{
      if(event.target.name==='name'){
        this.setState({
          name:event.target.value
        })
      }
      else if(event.target.name==='phone'){
        this.setState({
          phone:event.target.value
        })
      }
      else if(event.target.name==='uname'){
        this.setState({
          uname:event.target.value
        })
      }
      else if(event.target.name==='cvv'){
        this.setState({
          cvv:event.target.value
        })
      }
      else if(event.target.name==='exp_date'){
        this.setState({
          exp_date:event.target.value
        })
      }
      else if(event.target.name==='card_no'){
        this.setState({
          card_no:event.target.value
        })
      }
      else if(event.target.name==='profile'){
        console.log(event.target.value);
  
        let reader = new FileReader();
        let file = event.target.files[0];
  
        reader.onloadend = () => {
        this.setState({
          profile: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }
  }
    
    submitForm=()=>{
      if(this.state.name===''){
        this.setState({
          errorMsg:'Please fill the name'
        })
      }
      else if(this.state.phone===''){
        this.setState({
          errorMsg:'Please fill the phone number'
        })
      }
      else if(this.state.uname===''){
        this.setState({
          errorMsg:'Please fill the User Name'
        })
      }
      else if(this.state.card_no===''){
        this.setState({
          errorMsg:'Please fill the Card Number'
        })
      }
      else if(this.state.exp_date===''){
        this.setState({
          errorMsg:'Please fill the Expiry Date'
        })
      }
      else if(this.state.cvv===''){
        this.setState({
          errorMsg:'Please fill the CVV number'
        })
      }
      else if(this.state.profile===''){
        this.setState({
          errorMsg:'Please upload your photo'
        })
      }
      else{
      let self = this;
      self.setState({
        loading: true
      })

      var data = new FormData();
      let name = self.state.name;
      let uname = self.state.uname;
      let card_no = self.state.card_no;
      let exp_date = self.state.exp_date;
      let cvv = self.state.cvv;
      let ph_no = self.state.phone;
      data.append('image', self.state.profile);
      console.log(self.state.profile);
      let url = "http://139.59.91.68:5000/add/user?name="+name+"&uname="+uname+"&card_no="+card_no+"&exp_date="
      +exp_date+"&cvv="+cvv+"&ph_no="+ph_no
      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "contentType": "multipart/form-data"
        },
      }).then(function(response) {
        self.setState({
          loading:false
        })
        response.status     //=> number 100–599
        response.statusText //=> String
        response.headers    //=> Headers
        response.url        //=> String
        console.log(response);
        return response.text()
      }, function(error) {
        error.message //=> String
      })
      .then(function(response){
        console.log(response);
        let message = response;
        window.location.reload('/');
        if(message.status===200){

          self.setState({
            result: true,
            message:response.message
          })
        }
        else{
          self.setState({
            message:response.message
          })
        }
      })
    }
    }

    render() {
      return (
        <span>
        {!this.state.result?
          <div className="inputFields">
          <div><img src="/images/mercedes.png" className='logo'/></div>
          <h3 style={{'margin':'0'}}>Sign up</h3><br/>
          <h5 style={{'margin':'0','color':'#ddd'}}>Automate</h5><br/>

          <div className="signUpContainer">
              <div className="addProfilePicture" onClick={this.addProfilePicture}>
                {this.state.profile!==''?<img src={this.state.imagePreviewUrl}/>:<span>+</span>}
              </div>
              <div className="inputFieldContainer">
              <input ref="fileUploader" type="file" onChange={this.onChange} 
              name="profile" style={{'display':'none'}} />
              </div>
            </div>
          <input type="text" value={this.state.name}
            onChange={this.onChange} name="name" 
            placeholder="Your Name" className="customInputField" /><br/>
          <input type="number" name="phone"
            value={this.state.phone}
            onChange={this.onChange} placeholder="Your Phone Number" className="customInputField" /><br/>
          
          <input type="text" name="uname"
            value={this.state.uname}
            onChange={this.onChange} placeholder="Your Username" className="customInputField" /><br/>
          
            <input type="number" name="card_no"
            value={this.state.card_no}
            onChange={this.onChange} placeholder="Your Card Number" className="customInputField" /><br/>

          <input type="text" name="exp_date"
            value={this.state.exp_date}
            onChange={this.onChange} placeholder="Your Card Expiry Date" className="customInputField" /><br/>

          <input type="number" name="cvv"
            value={this.state.cvv}
            onChange={this.onChange} placeholder="Your CVV" className="customInputField" /><br/>

            {this.state.errorMsg!==''?<p>{this.state.errorMsg}</p>:''}

            <div className="submit-btn" onClick={this.submitForm}>Submit</div>
          {this.state.loading?
            <FontAwesome
            className='super-crazy-colors'
            name='spinner'
            spin
            size='2x'
          />:''}

        </div>:
        <div className="result">
          <h3>{this.state.message}</h3>
        </div>}
      </span>
      );
    }
}
export default Home;
