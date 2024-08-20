$(document).ready(function () {

    $(document).on('click', ".searchBtn", function () {

        

        const inputValue = $('.inputSearch').val();

        if (inputValue != "") {
            const valueString = inputValue.toLowerCase()

            $.ajax({
                url: `https://api.dictionaryapi.dev/api/v2/entries/en/${valueString}`,
                type: 'GET',
                dataType: "json",
                success: function (data) {
                    let word = `
                <p>Word: ${data[0].word}</p>
                <p>Definition: ${data[0].meanings[0].definitions[0].definition}</p>
                `
                    $('.cardResult').html(word)

                    let phoneticsAudio = `
                    <h4>
                        Phonetics
                    </h4> 
                    <audio controls>
                        <source src="${data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio} ">
                    </audio>
                `
                    $('.audioPhonetics').html(phoneticsAudio)

                    console.table('Data received from API:', data)

                },
                error: function (error) {
                    console.log('Error fetching word data:', error)
                    let searchError = `
                    <p>Adicione uma única palavra válida, verifique a ortografia e não adicione caracteres no ato da busca.</p>
                    `
                    $('.cardResult').html(searchError)
                    
                },
            })

        }
        else {
            const error = $("<p class=errorInputNull></p>").text("Insira uma palavra para realizar a pesquisa.")
            $('.cardResult').append(error)
        }


    })
})