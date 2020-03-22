/* global test: false */
import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure as configureEnzyme, shallow } from 'enzyme';
import createChaiEnzyme from 'chai-enzyme';
import createChaiJestDiff from 'chai-jest-diff';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

import withFetch from './with-fetch';
import {
  DefaultLoading,
  DefaultValidationError,
  DefaultInternalError,
} from '../../components/utils';

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(createChaiEnzyme());

configureEnzyme({ adapter: new Adapter() });

test('If loading and no prop loading supplied, the inner component is replaced by the default fallback loading component', () => {
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const wrapper = shallow(<Wrapper dispatch={() => null} />);

  expect(wrapper.equals(<DefaultLoading />)).to.equal(true);
});

test('If loading and loading prop supplied, the inner component is replaced by the specified fallback loading component', () => {
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const Loading = () => <div>loading...</div>;
  const wrapper = shallow(<Wrapper dispatch={() => null} loading={<Loading />} />);

  expect(wrapper.equals(<Loading />)).to.equal(true);
});

test('If request sucessful, the dispatch prop is called with the action returned by the async action', (done) => {
  const dispatch = sinon.spy();
  const action = { type: 'ACTION_TYPE', data: 'ACTION_DATA' };
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(action); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  shallow(<Wrapper dispatch={dispatch} />);

  setTimeout(() => {
    expect(dispatch.calledWith(action)).to.equal(true);
    done();
  }, 150);
});

test('If request sucessful, the inner component is returned without any data from the request supplied to it', (done) => {
  const dispatch = sinon.spy();
  const action = { type: 'ACTION_TYPE', data: 'ACTION_DATA' };
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(action); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const additionalProp = { key: 'value' };
  const wrapper = shallow(<Wrapper dispatch={dispatch} additionalProp={additionalProp} />);

  setTimeout(() => {
    expect(wrapper.equals(<Component additionalProp={additionalProp} />)).to.equal(true);
    done();
  }, 150);
});

test('If request successful and the prop onSuccess supplied, it is called with the dispatch prop', (done) => {
  const dispatch = sinon.spy();
  const onSuccess = sinon.spy();
  const action = { type: 'ACTION_TYPE', data: 'ACTION_DATA' };
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(action); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onSuccess={onSuccess} />);

  setTimeout(() => {
    expect(onSuccess.calledWith(dispatch)).to.equal(true);
    done();
  }, 150);
});

test('If a validation error occured, the onSuccess prop must not be called', (done) => {
  const dispatch = sinon.spy();
  const onSuccess = sinon.spy();
  const error = { response: { status: 400, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onSuccess={onSuccess} />);

  setTimeout(() => {
    expect(onSuccess.called).to.equal(false);
    done();
  }, 150);
});

test('If an internal server error occured, the onSuccess prop must not be called', (done) => {
  const dispatch = sinon.spy();
  const onSuccess = sinon.spy();
  const error = { response: { status: 500, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onSuccess={onSuccess} />);

  setTimeout(() => {
    expect(onSuccess.called).to.equal(false);
    done();
  }, 150);
});

test('If a validation error occured and onError prop supplied, it must be called with the dispatch prop and the error', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const error = { response: { status: 400, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onError={onError} />);

  setTimeout(() => {
    expect(onError.calledWith(dispatch, error.response.data)).to.equal(true);
    done();
  }, 150);
});

test('If an internal server error occured and onError prop supplied, it must be called with the dispatch prop and the error', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const error = { response: { status: 500, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onError={onError} />);

  setTimeout(() => {
    expect(onError.calledWith(dispatch, error.response.data)).to.equal(true);
    done();
  }, 150);
});

test('If request succeeded and onError prop supplied, it must not be called', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const action = { type: 'ACTION_TYPE', data: 'ACTION_DATA' };
  const asyncAction = new Promise(resolve => setTimeout(() => { resolve(action); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);

  shallow(<Wrapper dispatch={dispatch} onError={onError} />);

  setTimeout(() => {
    expect(onError.called).to.equal(false);
    done();
  }, 150);
});

test('On validation error (status === 400) and no prop validationError supplied, must return the default validation error component', (done) => {
  const dispatch = sinon.spy();
  const error = { response: { status: 400, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} />);

  setTimeout(() => {
    expect(wrapper.equals(<DefaultValidationError error={error.response.data} />)).to.equal(true);
    done();
  }, 150);
});

test('On validation error (status === 400) and prop validationError supplied, the inner component is replaced by it', (done) => {
  const dispatch = sinon.spy();
  const validationError = error => (
    <div>
      {`A test validation error component with error ${error.message}`}
    </div>
  );
  const error = { response: { status: 400, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} validationError={validationError} />);

  setTimeout(() => {
    expect(wrapper.equals(validationError(error.response.data))).to.equal(true);
    done();
  }, 150);
});

test('On internal server error (status === 500) and no prop internalServerError supplied, must return the default internal server error component', (done) => {
  const dispatch = sinon.spy();
  const error = { response: { status: 500, data: { message: 'A validation error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} />);

  setTimeout(() => {
    expect(wrapper.equals(<DefaultInternalError error={error.response.data} />)).to.equal(true);
    done();
  }, 150);
});

test('On internal server error (status === 500) and prop internalServerError supplied, error.data is supplied to it', (done) => {
  const dispatch = sinon.spy();
  const internalError = error => (
    <div>
      {`A test internal server error component with error ${error.message}`}
    </div>
  );
  const error = { response: { status: 500, data: { message: 'An internal server error occured' } } };
  const asyncAction = new Promise((_, reject) => setTimeout(() => { reject(error); }, 100));
  const Component = () => <div>An inner component</div>;
  const Wrapper = withFetch(asyncAction)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} internalError={internalError} />);

  setTimeout(() => {
    expect(wrapper.equals(internalError(error.response.data))).to.equal(true);
    done();
  }, 150);
});
