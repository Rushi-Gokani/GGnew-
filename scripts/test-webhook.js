
const webhookUrl = 'https://feed.ohmylead.com/api/webhook/9fa8e014-82c7-4f9c-a5e9-97ad8666581c';

const formData = {
  name: 'Test Script User',
  email: 'test@script.com',
  phone: '+1234567890',
  city: 'Test City',
  guest_count: '100',
  message: 'This is a test submission from the verification script.'
};

// Split name
const nameParts = formData.name.trim().split(' ');
const firstName = nameParts[0] || '';
const lastName = nameParts.slice(1).join(' ') || '';

const payload = {
  ...formData,
  // Snake case
  full_name: formData.name,
  first_name: firstName,
  last_name: lastName,
  // Camel case
  fullName: formData.name,
  firstName: firstName,
  lastName: lastName,
  // Lowercase
  fullname: formData.name,
  firstname: firstName,
  lastname: lastName,
};

console.log('Sending payload:', JSON.stringify(payload, null, 2));

async function runTest() {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response Status:', response.status);
    console.log('Response Text:', await response.text());
    
    if (response.ok) {
        console.log('✅ Webhook submission successful!');
    } else {
        console.log('❌ Webhook submission failed.');
    }

  } catch (error) {
    console.error('Error submitting to webhook:', error);
  }
}

runTest();
