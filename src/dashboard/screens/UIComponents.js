import React from "react";
import Alert from "../../components/ui/Alert";

export default function UIComponents() {
  return (
    <div className='grid grid-cols-3 gap-10'>
      <section>
      <h1>Components</h1>
      <p className='base-desc'>Most of them are just html5 native tags. Some others require a minimun set of classes or attributes. </p>
      </section>

      <section className="py-4">
        <label>Alerts</label>
        <Alert title="Hi!" details="This is a default notification" />
        <Alert icon='alert-triangle' title="Oops" details="Something went wrong , with icon" color='red' />
        <Alert title="Hmmm... " details="There's a warning" color='yellow' />
        <Alert title="Great!" details="Keep doint that!" color='green' />
        <Alert title="Ok" details="Your message has been sent." color='blue' />
      </section>
      <section className="py-4">
        <label>Buttons</label> <br />
        <div className="button-group">
          <button>Primary</button>
          <button disabled>Disabled</button>
          <button type="reset">Secondary</button>
          <button type="reset" disabled> Secondary Disabled </button>
          <button className='bg-green'>Primary green</button>
          <button className='bg-blue'>Primary blue</button>
          <button className='bg-yellow'>Primary yellow</button>
        </div>
      </section>
      <section className="py-4">
        <label>Base | Cards</label>
        <div className="base">
          <p className="base-desc">Base Description</p>
          <h3 className="base-subtitle">Base SubTitle</h3>
          <h2 className="base-title">Base Title</h2>
        </div>
        <div className="base base-reactive mt-2">
          <h2 className="base-title">Base Title on Reactive Component</h2>
          <p className="base-desc">Base Description</p>
        </div>
        <div className="base base-reactive mt-2 bg-blue">
          <h2 className="base-title">Base Component with buttons</h2>
          <p className="base-desc mb-4">Base Description</p>
          <button>Primary</button>
          <button>Primary</button>

        </div>
      </section>
      <section className="py-4">
        <label>Forms</label>
        <form>
            <label>Label</label>
            <input type='text' placeholder='Text input'/>
            <label>Label</label>
            <input type='number' placeholder='Number input'/>
            <label>Select</label>
            <select><option>Select</option></select>
            <button>Accept</button>
            <button type="reset" >Cancel</button>
        </form>
      </section>
      <section className="py-4">
        <label>Badges ( WIP )</label>
        <br />
        <span className='badge bg-red'>10 errors</span>
        <span className='badge bg-green'>Pass test OK</span>
        <span className='badge bg-blue'>10 errors</span>
        <span className='badge bg-yellow'>10 errors</span>
      </section>
      
    </div>
  );
}
