import React, { Component } from 'react';

import Modal from '../../components/UserInterface/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return  (
                <Auxillary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                        Something didn't work!
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxillary>
            );
        }
    }
}

export default withErrorHandler;