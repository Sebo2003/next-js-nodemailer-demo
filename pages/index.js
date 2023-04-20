/**
 * based off of this video: https://www.youtube.com/watch?v=t2LvPXHLrek&t=960s
 */
import Head from 'next/head'
import { useState } from 'react'
import { sendContactForm } from '/lib/api';

const initValues = {
  name:"", 
  subject:"",
  email:"",
  message:""
}

const initState = {values:initValues}

export default function Home() {
  const [state, setState] = useState(initState);
   
  const {values} = state;

  const handleChange = ({target}) => 
    setState((prev) => ({
      ...prev, 
      values:{
        ...prev.values,
        [target.name]: target.value
      }
  }));

  const onSubmit = async () => {
    try {
      await sendContactForm(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Email tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       <h1>Contact:</h1>
       <form>
        <fieldset>
          <legend>Input fields:</legend>
          <div>
            <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={values.name} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="subject">Subject:</label>
            <input type="text" id="sub" name="subject" value={values.subject} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={values.email} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="message">Message:</label>
            <textarea type="text" id="message" name="message" value={values.message} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="submit">Submit info:</label>
            <button onClick={onSubmit} disabled={!values.name || !values.subject || !values.email || !values.message}>Submit</button>
          </div>
        </fieldset>
      </form>
      </main>
    </>
  )
}