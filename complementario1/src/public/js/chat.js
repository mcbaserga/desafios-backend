let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username for the chat',
    inputValidator: value => {
        return !value.trim() && 'Please insert a valid username'
    },
    allowOutsideClick: false
}).then(result => {
    username = result.value
    document.getElementById('username').innerHTML = username 
    let socket = io()

    chatBox.addEventListener('keyup', event => {
        if (event.key === 'Enter') { 
            if (chatBox.value.trim().length > 0) {
                socket.emit('message', {
                    username,
                    message: chatBox.value
                })
                chatBox.value = ''
            }
        }
    })
            socket.on('logs', data => {
                const divLogs = document.getElementById('messagesLogs')
                let messages = ''
                data.forEach(message => {
                    messages += `<p><i>${message.username}</i>: ${message.message}</p>`
                })
                divLogs.innerHTML = messages
            })     
            
            socket.on('alerta', () => {
                alert('Nuevo usuario en línea')
            })
        

})