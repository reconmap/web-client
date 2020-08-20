import React from "react";
import Alert from "./Alert";

export default function ComponentsList() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
   
      <section className='py-4'>
      <label>Projects</label>
      <div className='gap-4 flex flex-wrap'>

        <div className='base base-project'>
          <h3>Description</h3>
          <h1>Project with footer</h1>
          <footer>Id enim laboris cillum mollit amet reprehenderit</footer>
        </div>
        <div className='base base-project'>
          <header>Dolore laborum ad ad ipsum ex pariatur quis enim Lorem irure. </header>
          <h3>Description of project with header</h3>
          <h1>Project</h1>
        </div>
        </div>

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
          <h3>Base Description</h3>
          <h2>Base SubTitle</h2>
        </div>
        <div className="base base-reactive mt-2">
          <h1>Base Title on Reactive Component</h1>
          <h3>Base Description</h3>
        </div>
        <div className="base base-reactive mt-2 ">
          <h1>Base Component with buttons</h1>
          <h3>Base Description</h3>
          <footer>
            <button>Primary</button>
            <button>Primary</button>
          </footer>

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
