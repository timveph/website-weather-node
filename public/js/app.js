const weatherForm = document.querySelector('form')
const formInputBox = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = formInputBox.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?location='+encodeURIComponent(searchLocation)).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                let theBlurb = "Current temperature is " + data.forecast.currentTemp + "°C as of " + data.forecast.time + '. If you look outside it should be ' + (data.forecast.description).toString().toLowerCase() + ' (' + data.forecast.cloudcover + '% cloud cover).'

                messageOne.textContent = data.location
                messageTwo.textContent = theBlurb
                // console.log(data.forecast)
            }
        })
    })
})
