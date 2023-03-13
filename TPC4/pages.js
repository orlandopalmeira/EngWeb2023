// module pages.js by Orlando Palmeira 2023-03-12

function addTaskAndUSer_Form() {
    return `
    <div class="w3-container w3-row" style="margin-top: 17px; height:31vh;">
            <div class="w3-card w3-half" style="padding: 5px 5px; height: 100%; overflow-y: auto;" >
                <h3 style="margin-left: 15px">Adicionar uma tarefa ao sistema</h3>
                <form class="w3-container"  method="POST">
                    <input type="hidden" name="_method" value="_post_task"/> <!-- Método do formulário -->
                    <div class="w3-row w3-section">
                        <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-calendar w3-text-teal"></i></div>
                        <div class="w3-rest">
                            <input class="w3-input myinput" name="due_date" type="text" placeholder="Data limite (AAAA-MM-DD)">
                        </div>
                    </div>
                    <div class="w3-row w3-section">
                        <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-user w3-text-teal"></i></div>
                        <div class="w3-rest">
                            <input class="w3-input myinput" name="who" type="text" placeholder="Utilizador responsável pela tarefa">
                        </div>
                    </div>
                    <div class="w3-row w3-section">
                        <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-file-text-o w3-text-teal"></i></div>
                        <div class="w3-rest">
                            <input class="w3-input myinput" name="what" type="text" placeholder="Descrição da tarefa">
                        </div>
                    </div>
                    <div class="w3-right-align" style="margin-bottom: 10px">
                        <button class="w3-btn w3-teal w3-mb-2" type="submit">Submeter</button>
                    </div>
                </form>
            </div>
            <div class="w3-card w3-half" style="padding: 5px 5px; height: 100%; overflow-y: auto;">
                <h3 style="margin-left: 15px">Adicionar um utilizador ao sistema</h3>
                <form class="w3-container" method="POST">
                    <input type="hidden" name="_method" value="_post_user"/> <!-- Método do formulário -->
                    <div class="w3-row w3-section">
                        <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-user w3-text-teal"></i></div>
                        <div class="w3-rest">
                            <input class="w3-input myinput" name="name" type="text" placeholder="Nome">
                        </div>
                    </div>
                    <div class="w3-right-align" style="margin-bottom: 10px; position: relative; top: 10vh;">
                        <button class="w3-btn w3-teal w3-mb-2" type="submit">Submeter</button>
                    </div>
                </form>
            </div>
        </div> 
    `
}

function editTask_Form(task){
    return `
    <form class="w3-card" style="padding: 10px; margin-bottom:10px" method="POST">
    <input type="hidden" name="_method" value="_put_task"/> <!-- Método do formulário -->
        <div class="w3-row w3-section" >
            <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-key w3-text-teal"></i></div>
            <div class="w3-rest">
                <input class="w3-input myinput" name="id" type="text" value="${task.id}" readonly>
            </div>
        </div>
        <div class="w3-row w3-section">
            <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-calendar w3-text-teal"></i></div>
            <div class="w3-rest">
                <input class="w3-input myinput" name="due_date" type="text" value="${task.due_date}">
            </div>
        </div>
        <div class="w3-row w3-section">
            <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-user w3-text-teal"></i></div>
            <div class="w3-rest">
                <input class="w3-input myinput" name="who" type="text" value="${task.who}">
            </div>
        </div>
        <div class="w3-row w3-section">
            <div class="w3-col" style="width:40px"><i class="w3-xlarge fa fa-file-text-o w3-text-teal"></i></div>
            <div class="w3-rest">
                <input class="w3-input myinput" name="what" type="text" value="${task.what}">
            </div>
        </div>
        <input type="hidden" name="finished" value="${task.finished}" readonly/>
        <div class="w3-right-align">
            <button class="w3-btn w3-teal w3-mb-2" type="submit" name="pressedButton" value="concluida">Concluída</button>
            <button class="w3-btn w3-teal w3-mb-2" type="submit" name="pressedButton" value="submetida">Submeter</button>
        </div>
    </form>
    `
}

function finishedTask_Card(task){
    return `
    <div class="w3-card w3-row w3-section" style="padding: 5px">
        <div class="w3-col" style="width:40px"><i class="w3-large fa fa-user w3-text-teal"></i></div>
        <div class="w3-rest">
            ${task.who}
        </div>
        <div class="w3-col" style="width:40px"><i class="w3-large fa fa-file-text-o w3-text-teal"></i></div>
        <div class="w3-rest w3-justify">
            ${task.what}
        </div>
        <div class="w3-col" style="width:40px"><i class="w3-large fa fa-calendar w3-text-teal"></i></div>
        <div class="w3-rest">
            ${task.due_date}
        </div>
    </div>`
}

exports.initPage = function(notFinished, finished){
    let pagHTML = `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <title>TODO List App</title>
        <link rel="stylesheet" href="w3.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <div class="w3-card-4" style="max-height: 100%;">
            <header class="w3-container w3-teal">
                <h1>TODO List App</h1>
            </header>`
    pagHTML += addTaskAndUSer_Form()
    pagHTML += `
    <div class="w3-row w3-card" style="max-height: 47vh;overflow-y: auto; margin: 17px">
            <!--Tarefas por realizar-->
            <div class="w3-half w3-container">
                <h2>Tarefas por realizar</h2>`
    notFinished.forEach(task => {
        pagHTML += editTask_Form(task)
    });

    pagHTML += `
    </div>
        <div class="w3-half w3-container " >
            <h2>Tarefas realizadas</h2>`
    
    finished.forEach(task => {
        pagHTML += finishedTask_Card(task)
    })

    pagHTML += `
        </div>
    </div>
    <footer class="w3-container w3-teal w3-center">
        <h5>By Orlando Palmeira @ Universidade do Minho</h5>
    </footer>
</div>
</body>
</html>`
    return pagHTML
}