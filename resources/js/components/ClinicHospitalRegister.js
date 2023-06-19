import React, { Component } from 'react'
import axios from 'axios'
import RegisterSucessMessage from './RegisterSucessMessage'
import RegisterDangerMessage from './RegisterDangerMessage'
import { Link } from 'react-router-dom';
class ClinicHospitalRegister extends Component {
  constructor() {
    super()
    this.state = {
        name: '',
        first_name_error:'',
        email: '',
        email_error:'',
        password: '',
        password_error:'',
        type:'Clinic',
        alert_message: '',
        specializations_all:[],
        specialization_id:'',
        specialization_id_error:'',
    }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validate(){
      let first_name_error = "";
      let email_error = "";
      let specialization_id_error = "";
      let password_error = "";
    
      if(this.state.name == ""){
        first_name_error = 1;
      }

      if(this.state.specialization_id == ""){
        specialization_id_error = 1;
      }
    
      if(this.state.email == ""){
        email_error = 1;
      }

      if(this.state.password == ""){
        password_error = 1;
      }
    
      
    
      if(first_name_error || specialization_id_error || email_error || password_error){
        this.setState({
          first_name_error: first_name_error,
          specialization_id_error: specialization_id_error,
          email_error: email_error,
          password_error: password_error,
        });
        return false;
      }
      return true;
    }

    onSubmit (e) {
    e.preventDefault()
    const isValid = this.validate();
        if(isValid){

    const newUser = {
    fullname: this.state.name,
    email: this.state.email,
    password: this.state.password,
    type: this.state.type,
    specialization_id: this.state.specialization_id
    }

axios.post('api/register', newUser, {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.setState({
        alert_message:"Success"
      })
    })
    .catch(err => {
      this.setState({
        alert_message:"Danger"
      })
      })

    this.setState({
      name: '',
      specialization_id: '',
      email: '',
      password: '',
      alert_message: '',
      first_name_error: '',
      specialization_id_error: '',
      email_error: '',
      password_error: '',
    });
    }
  }

  componentDidMount (){
    /*
    |--------------------------------------------------------------------------
    | select all specializations in Homepage
    |--------------------------------------------------------------------------
    */
    axios.get('/api/specializations_all')
    .then(res => {
      this.setState({
        specializations_all: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }



    render() {
        return (
 <div>
  {/*Breadcrumb*/}
  <section>
    <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
      <div className="header-text mb-0">
        <div className="container">
          <div className="text-center text-white ">
            <ol className="breadcrumb text-center">
            <li className="breadcrumb-item"><Link to="/">صفحه اصلی</Link> </li>
             <li className="breadcrumb-item"><Link to="/clinic-hospital-register">ثبت نام کلینیک - شفاخانه ها</Link></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*/Breadcrumb*/}
  {/*Add listing*/}
  <section className="sptb">
    <div className="container">
      <div className="row">
        {/*Left Side Content*/}
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div className="card mb-lg-0">				
            <div className="card-header">
              <h3 className="card-title">ثبت کلینیک/شفاخانه</h3>
            </div>
            <div className="card-body">
            {this.state.alert_message=="Success"?<RegisterSucessMessage />:null}
            {this.state.alert_message=="Danger"?<RegisterDangerMessage/>:null}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" 
                placeholder="نام کلینیک/شفاخانه" 
                name="name" 
                value={this.state.name} 
                onChange={this.onChange}
                style = {this.state.first_name_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
                />
              </div>
              <div className="form-group">
              <select className="form-control" data-placeholder="انتخاب تخصص اصلی" onChange={this.onChange} name="specialization_id"
              style = {this.state.specialization_id_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
              >
              <option value="">تخصص اصلی</option>
                        {
                      this.state.specializations_all.map(specialization_all=>{
                        return ( 
                        <option  key={specialization_all.id} value={specialization_all.id}>{specialization_all.name}</option>
                        )
                      })
                      }
											</select>
               </div>
              <div className="form-group">
                <input type="email" className="form-control" 
                placeholder="ایمیل"
                name="email"
                value={this.state.email}
                onChange={this.onChange} 
                style = {this.state.email_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}              
                />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" 
                placeholder="پسورد"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                style = {this.state.password_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
                />
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <span className="custom-control-label text-dark">  موافق به&nbsp;
                  <Link exact to="/privacy-policy" >
                   قوانین و مقررات
                  </Link>
                  </span>
                </label>
              </div>
              <div className="form-footer mt-2">
                <button type="submit" className="btn btn-primary btn-block">ثبت در سیستم</button>
              </div>
              <div className="text-center  mt-3 text-dark">
                آیا شما قبلا حساب ایجاد کرده اید؟<a href="/">ورود به سیستم</a>
              </div>
              </form>
            </div>
          </div>
        </div>
        {/*/Left Side Content*/}
        <div className="col-xl-6 col-lg-6 col-md-12">
          {/*Jobs Description*/}
          <div className="card overflow-hidden">
            <div className="ribbon ribbon-top-left text-danger"><span className="bg-danger">مزایا و معلومات</span></div>
            <div className="card-body border-top">
              <div className="panel-body text-center">
                <p className="card-category">ثبت منحیث کلینیک/شفاخانه</p>
              </div>
              <ul className="list-group list-group-flush text-center">
                <li className="list-group-item"><span className="font-weight-semibold">100% رایگان</span></li>
                <li className="list-group-item"><span className="font-weight-semibold">اختصاص داکتران به کلینیک/شفاخانه</span></li>
                <li className="list-group-item"><span className="font-weight-semibold">نوبت گیری آنلاین و تلفنی</span></li>
                <li className="list-group-item"><span className="font-weight-semibold">ثبت دوسیه به مریضان</span></li>
                <li className="list-group-item"><span className="font-weight-semibold">ایجاد پروفایل</span></li>
              </ul><br />
              <h4 className="mb-4 font-weight-semibold">معلومات عمومی</h4>
              <div className="mb-4">
                <p>
                کلینیک و شفاخانه ها می توانند پس از ثبت نام و ارائه معتبرین ترین جواز کاری در سیستم داکترمن فعالیت نموده و تحت یک سیستم متمرکز حرفه ای و با روش های مختلف نوبت دهی آنلاین و تلفنی، نسبت به نوبت دهی به بیماران خود اقدام کنند.
                   </p>
              </div>
              <h4 className="mb-4 font-weight-semibold">عضویت داکترمن</h4>
              <div className="row">
                <div className="col-xl-12 col-md-12">
                  <div className="table-responsive">
                    <table className="table row table-borderless w-100 m-0 text-nowrap ">
                      <tbody className="col-lg-12 col-xl-12 p-0">
                      <tr>
                                <td><span ><i className="fa fa-caret-left  ml-2" />
                                در صورت هر گونه گزارش یا نیاز مدیریت داکترمن، قادر به درخواست اطلاعات بیشتر و یا ارسال جوازکار برای تایید حساب کاربری مرکزصحی میباشد.
                                 </span></td>
                                </tr>
                                <tr>
                                <td><span ><i className="fa fa-caret-left  ml-2" />
                                داکترمن تمام تلاش خود را به کار گرفته است که با قرار دادن فیلترینگ درست اطلاعات، اطلاعات صحیحی از داکتران به مخاطبان ارائه دهد 
                                 </span></td>
                                </tr>
                                <tr>
                                <td><span ><i className="fa fa-caret-left  ml-2" />
                                داکترمن تمام تلاش خود را به کار گرفته است که با قرار دادن فیلترینگ درست اطلاعات، اطلاعات صحیحی از مراکزصحی به مخاطبان ارائه دهد.
                                 </span></td>
                                </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Details Description*/}
        </div>
      </div>
    </div>
  </section>
  {/*/Add listing*/}
</div>

        )
    }
}

export default ClinicHospitalRegister
