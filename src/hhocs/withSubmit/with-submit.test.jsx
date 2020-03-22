/* global test: false */
import React from 'react';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { configure as configureEnzyme, shallow } from 'enzyme';
import createChaiEnzyme from 'chai-enzyme';
import createChaiJestDiff from 'chai-jest-diff';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

import withSubmit from './with-submit';

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(createChaiEnzyme());

configureEnzyme({ adapter: new Adapter() });

test(
  'When the request not initiated, the inner component receives the submitting prop to false and no error (prop name not specified)',
  () => {
    const dispatch = sinon.spy();
    const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
    const asyncActionMethodProvider = data => asyncAction(data);
    const Component = () => <div>An inner component</div>;
    const Wrapper = withSubmit(asyncActionMethodProvider)(Component);
    const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

    expect(wrapper.equals(
      <Component
        submitting={false}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
  }
);

test(
  'When the request not initiated, the inner component receives the submitting prop to false and no error (prop name specified)', () => {
    const dispatch = sinon.spy();
    const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
    const asyncActionMethodProvider = data => asyncAction(data);
    const Component = () => <div>An inner component</div>;
    const customSubmittingName = 'customSubmittingName';
    const Wrapper = withSubmit(asyncActionMethodProvider, { submittingName: customSubmittingName })(
      Component
    );
    const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

    expect(wrapper.equals(
      <Component
        {...{ [customSubmittingName]: false }}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
  }
);

test('As soon as the request is initiated, the onStart prop (if specified) is called with the dispatch prop', () => {
  const dispatch = sinon.spy();
  const onStart = sinon.spy();
  const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} onStart={onStart} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  expect(onStart.calledWith(dispatch)).to.equal(true);
});

test('When submitting data, the inner component receives the submitting prop to true and no error (prop name not specified)', (done) => {
  const dispatch = sinon.spy();
  const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        submitting
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 50);
});

test('When submitting data, the inner component receives the submitting prop to true and no error (prop name specified)', (done) => {
  const dispatch = sinon.spy();
  const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const customSubmittingName = 'customSubmittingName';
  const Wrapper = withSubmit(asyncActionMethodProvider, { submittingName: customSubmittingName })(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        {...{ [customSubmittingName]: true }}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 50);
});

test(
  'When the request succeeded, the inner component receives the submitting prop to false and no error and the dispatch prop is called (prop name not specified)',
  (done) => {
    const dispatch = sinon.spy();
    const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
    const asyncActionMethodProvider = data => asyncAction(data);
    const Component = () => <div>An inner component</div>;
    const Wrapper = withSubmit(asyncActionMethodProvider)(Component);
    const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

    wrapper.prop('submit')('value2');
    setTimeout(() => {
      expect(wrapper.equals(
        <Component
          submitting={false}
          submit={wrapper.instance().submit}
          additional={{ key: 'value' }}
        />
      )).to.equal(true);
      expect(dispatch.calledWith({ key1: 'value1', key2: 'value2' })).to.equal(true);
      done();
    }, 150);
  }
);

test(
  'When the request succeeded, the inner component receives the submitting prop to false and no error and the dispatch prop is called (prop name specified)',
  (done) => {
    const dispatch = sinon.spy();
    const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
    const asyncActionMethodProvider = data => asyncAction(data);
    const Component = () => <div>An inner component</div>;
    const customSubmittingName = 'customSubmittingName';
    const Wrapper = withSubmit(asyncActionMethodProvider, { submittingName: customSubmittingName })(
      Component
    );
    const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

    wrapper.prop('submit')('value2');
    setTimeout(() => {
      expect(wrapper.equals(
        <Component
          {...{ [customSubmittingName]: false }}
          submit={wrapper.instance().submit}
          additional={{ key: 'value' }}
        />
      )).to.equal(true);
      expect(dispatch.calledWith({ key1: 'value1', key2: 'value2' })).to.equal(true);
      done();
    }, 150);
  }
);

test('When the request succeeded, the onSuccess prop (if specified) is called', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const onSuccess = sinon.spy();
  const asyncAction = data => new Promise(resolve => setTimeout(() => { resolve({ key1: 'value1', key2: data }); }, 100));
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(Component);
  const wrapper = shallow(<Wrapper dispatch={dispatch} onError={onError} onSuccess={onSuccess} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  setTimeout(() => {
    expect(onSuccess.calledWith(dispatch, { key1: 'value1', key2: 'value2' })).to.equal(true);
    expect(onError.called).to.equal(false);
    done();
  }, 150);
});

test('On a validation server error, the onError prop (if specified) is called', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const onSuccess = sinon.spy();
  const errorInData = data => ({
    response: { status: 400, data: { message: 'A validation error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} onError={onError} onSucess={onSuccess} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  setTimeout(() => {
    expect(onError.calledWith(dispatch, errorInData('value2').response.data)).to.equal(true);
    expect(onSuccess.called).to.equal(false);
    done();
  }, 150);
});

test('On an internal server error, the onError prop (if specified) is called', (done) => {
  const dispatch = sinon.spy();
  const onError = sinon.spy();
  const onSuccess = sinon.spy();
  const errorInData = data => ({
    response: { status: 500, data: { message: 'An internal error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} onSuccess={onSuccess} onError={onError} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value2');
  setTimeout(() => {
    expect(onError.calledWith(dispatch, errorInData('value2').response.data)).to.equal(true);
    expect(onSuccess.called).to.equal(false);
    done();
  }, 150);
});

test('On a validation server error, the inner component receives the submitting prop to false and the error (props names not specified)', (done) => {
  const dispatch = sinon.spy();
  const errorInData = data => ({
    response: { status: 400, data: { message: 'A validation error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value1');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        submitting={false}
        error={errorInData('value1').response.data}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 150);
});

test('On a validation server error, the inner component receives the submitting prop to false and the error (props names specified)', (done) => {
  const dispatch = sinon.spy();
  const errorInData = data => ({
    response: { status: 400, data: { message: 'A validation error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const customSubmittingName = 'customSubmittingName';
  const customErrorName = 'customErrorName';
  const Wrapper = withSubmit(asyncActionMethodProvider, {
    submittingName: customSubmittingName,
    errorName: customErrorName,
  })(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value1');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        {...{
          [customSubmittingName]: false,
          [customErrorName]: errorInData('value1').response.data,
        }}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 150);
});

test('On an internal server error, the inner component receives the submitting prop to false and the error (props names not specified)', (done) => {
  const dispatch = sinon.spy();
  const errorInData = data => ({
    response: { status: 500, data: { message: 'An internal server error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const Wrapper = withSubmit(asyncActionMethodProvider)(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value1');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        submitting={false}
        error={errorInData('value1').response.data}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 150);
});

test('On an internal server error, the inner component receives the submitting prop to false and the error (props names specified)', (done) => {
  const dispatch = sinon.spy();
  const errorInData = data => ({
    response: { status: 500, data: { message: 'An internal server error occured', sent: data } }
  });
  const asyncAction = data => new Promise(
    (_, reject) => setTimeout(() => { reject(errorInData(data)); }, 100)
  );
  const asyncActionMethodProvider = data => asyncAction(data);
  const Component = () => <div>An inner component</div>;
  const customSubmittingName = 'customSubmittingName';
  const customErrorName = 'customErrorName';
  const Wrapper = withSubmit(asyncActionMethodProvider, {
    submittingName: customSubmittingName,
    errorName: customErrorName,
  })(
    Component
  );
  const wrapper = shallow(<Wrapper dispatch={dispatch} additional={{ key: 'value' }} />);

  wrapper.prop('submit')('value1');
  setTimeout(() => {
    expect(wrapper.equals(
      <Component
        {...{
          [customSubmittingName]: false,
          [customErrorName]: errorInData('value1').response.data,
        }}
        submit={wrapper.instance().submit}
        additional={{ key: 'value' }}
      />
    )).to.equal(true);
    done();
  }, 150);
});
