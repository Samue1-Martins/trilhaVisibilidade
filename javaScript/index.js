$(document).ready(function () {

    $(document).on('click', ".searchBtn", function () {

        const clearHtml = $('.cardResult')
        clearHtml.html('')

        const inputValue = $('.inputSearch').val();
        if (inputValue != "") {
            const valueString = inputValue.toLowerCase()

            $.ajax({
                url: `https://api.dictionaryapi.dev/api/v2/entries/en/${valueString}`,
                type: 'GET',
                dataType: "json"
            })
                .then(function (data) {
                    console.log('Data received from API:', data)
                    let wordResult = `
                <p>Word: ${data[0].word}</p>
                <p>Definition: ${data[0].meanings[0].definitions[0].definition}</p>`
                    $('.cardResult').html(wordResult)
                    $('.inputSearch').css("border", "2px solid #6c63ff")
                    try {
                        let phoneticsAudio = `
                        <h4>
                            Phonetics
                        </h4> 
                        <audio controls>
                            <source src="${data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio} ">
                        </audio>`
                        $('.audioPhonetics').html(phoneticsAudio)
                    } catch (error) {
                        console.error('Áudio indisponível:', error)
                        let phoneticsAudio = `
                        <h4>
                            Áudio indisponível :(
                        </h4> `
                        $('.audioPhonetics').html(phoneticsAudio)
                    }
                })
                .catch(function (error) {
                    console.log('Error fetching word data:', error)
                    let searchError = `
                    <p>Adicione uma palavra válida para realizar a pesquisa, não adicione caracteres no ato da busca.
                    Se não estiver achando a palavra desejada, não se esqueça de verificar a ortografia!
                    </p>
                    `
                    $('.cardResult').html(searchError)
                    $('.inputSearch').css("border", "2px solid #ff0000")
                    $('.audioPhonetics').html('')
                })
        } else {
            const error = $("<p class=errorInputNull></p>").text("Insira uma palavra em inglês para realizar a pesquisa.")
            $('.cardResult').append(error)
            $('.inputSearch').css("border", "2px solid #ff0000")
            $('.audioPhonetics').html('')
        }
    })
})