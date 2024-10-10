 import { Col, Container, Row } from "react-bootstrap"
import "../landingpage.css"

 const FetechPricing = ()=>{
    return(
        <>
     <section id="team" className="faq section-bg section-bg-new section-overlay">
      <Container data-aos="fade-up">
        <Row className="row">
          <Col className="col-lg-6 col-md-12 col-sm-12 col-12" >
            <h2 className="whcolor titlebtm">OUR PRICING PLAN</h2>
            <p className="whcolor">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
            <p className="whcolor">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
            </p>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <ul className="whcolor">
                  <li className="checkmark crosscolor">Control center</li>
                  <li className="checkmark crosscolor">Metrics</li>
                  <li className="checkmark crosscolor">Fore cast</li>
                  <li className="checkmark crosscolor">Secure Access</li>
                  <li className="checkmark crosscolor">Private Project</li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <ul className="whcolor">
                  <li className="checkmark crosscolor">Benchmark</li>
                  <li className="checkmark crosscolor">Customers</li>
                  <li className="multiply">Reports and Notifications</li>
                  <li className="multiply">Easy to manage</li>
                  <li className="multiply">Manage for Everywhere</li>
                </ul>
              </div>
            </div>
          </Col>

          <Col className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="dflexheading">
              <div className="card card_Work">
                <div className="dlfex-btw">
                  <div>
                    <p className="marginbtm fontw-9">BASIC</p>
                    <p className="marginbtm">
                      Full access to all feature no credit
                    </p>
                    <p className="marginbtm">Card required</p>
                  </div>
                  <div>
                    <p><span className="font-amt">€ 120 / </span>month</p>
                  </div>
                </div>
              </div>
              <div className="card card_Work">
                <div className="dlfex-btw">
                  <div>
                    <p className="marginbtm fontw-9">PLUS</p>
                    <p className="marginbtm">
                      Full access to all feature no credit
                    </p>
                    <p className="marginbtm">Card required</p>
                  </div>
                  <div>
                    <p><span className="font-amt">€ 180 / </span>month</p>
                  </div>
                </div>
              </div>
              <div className="card card_Work">
                <div className="dlfex-btw">
                  <div>
                    <p className="marginbtm fontw-9">PREMIUM</p>
                    <p className="marginbtm">
                      Full access to all feature no credit
                    </p>
                    <p className="marginbtm">Card required</p>
                  </div>
                  <div>
                    <p><span className="font-amt">€ 210 / </span>month</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div></div>
      </Container>
    </section>
        
        </>
    )
}

export default FetechPricing

