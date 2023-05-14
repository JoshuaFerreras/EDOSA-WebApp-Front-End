<template>
    <div class="form-container">
      <h2>Patient Profile Form</h2>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required>
          </div>
          
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" id="age" v-model="age" required>
          </div>
          
          <div class="form-group">
            <label for="gender">Gender:</label>
            <select id="gender" v-model="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea id="address" v-model="address" required></textarea>
        </div>
        
        <div class="form-group">
          <button type="submit" @click.prevent="submitForm">Submit</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        age: '',
        gender: '',
        address: ''
      }
    },
    methods: {
      submitForm() {
        // handle form submission logic here
        console.log('Patient profile form submitted!');
        console.log('Name: ' + this.name);
        console.log('Age: ' + this.age);
        console.log('Gender: ' + this.gender);
        console.log('Address: ' + this.address);
      }
    }
  }
  </script>
  
  <style>
  
  .form-container {
    max-width: 500px;
    margin: auto;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .form-group {
    width: calc(33.33% - 10px);
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"],
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
  }
  
  select {
    background-color: #fff;
  }
  
  textarea {
    height: 100px;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }
  </style>
  
