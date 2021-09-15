const fs = require('fs').promises;
const Comments = require('parse-comments');
const comments = new Comments();

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const pageStart = `
<!-- This file was automatically generated -->
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/a11y-dark.min.css">
    <link rel="stylesheet" type="text/css" href="./assets/css/cssmain.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
    <script>
    hljs.initHighlightingOnLoad();
    </script>
</head>

<body style=" background-color: rgba(31, 41, 55);">
    <a href="https://npmjs.com/discord-logs">
        <center>
            <img src="https://i.ibb.co/MZsYGgj/image.png" alt="Logo" align="center">
        </center>
    </a>
    <h3 align="center">Add many useful events to your Discord.js client!</h3>
    <div class="container">
        <h4><em>This is a list of all the events Discord Logs handle. Not all events that could be supported are supported by the module. You can open a pull request to add new ones. This is just an automatically generated documentation list, see <a href="https://npmjs.com/discord-logs">the README file</a> to learn how to install and use the package.</em></h4>
        
`;
const pageEnd = `
    <br>
                  <div class="panel-body" align="center">
                Want to add cool events? Submit a pull request on <a href="https://github.com/Androz2091/discord-logs">Github</a>!
            </div>
        </div>
    </div>
</body>

</html>
`;
let pageContent = '';

(async () => {
    const handlersFiles = await fs.readdir('./handlers');
    let pointer = 0;
    await asyncForEach(
        handlersFiles.filter((f) => f.split('.')[0] !== 'index'),
        async (handler) => {
            const handlerContent = await fs.readFile(`./handlers/${handler}`, 'utf-8');
            const parsedComments = comments.parse(handlerContent);
            const handlerTitle = parsedComments[0].tags.find((tag) => tag.title === 'handler').description;
            const handlerDescription = `Events related to the ${
                parsedComments[0].tags.find((tag) => tag.title === 'related').description
            } event.`;
            pageContent += `
        <h3>${handlerTitle}</h3>
        <h5>${handlerDescription}</h5><br>`;
            parsedComments.forEach((blockComment) => {
                if (blockComment.value.includes('@event')) {
                    pageContent += `
                <div class="panel-group">
                    <div class="panel-heading">
                        <div class="border">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#event-${pointer}">${
                        blockComment.tags.find((f) => f.title === 'event').description
                    }</a>
                            </h4>
                        </div>
                    <div id="event-${pointer}" class="panel-collapse collapse">
                        <div class="panel-body">📡 ${blockComment.description}</div>
                        <div style="padding: 15px">ℹ️ Parameters: 
                        <br><br>
                        <table>
                        <tr>
                            <th>Name</th>
                            <th style="padding:0 15px 0 15px;">Type</th>
                            <th style="padding:0 15px 0 15px;">Description</th>
                        </tr>
                        ${blockComment.tags
                            .filter((tag) => tag.title === 'param')
                            .map(
                                (param) => `
                        <tr>
                            <td> ${param.name} </td>
                            <td style="padding:0 15px 0 15px;">
                                <a target="_blank" href="${
                                    param.type.name.startsWith('DJST:')
                                        ? `https://discord.js.org/#/docs/main/master/typedef/${param.type.name.slice(
                                              5,
                                          )}`
                                        : param.type.name.startsWith('DJS:')
                                        ? `https://discord.js.org/#/docs/main/master/class/${param.type.name.slice(4)}`
                                        : `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${param.type.name}`
                                }">
                                ${
                                    param.type.name.startsWith('DJST:')
                                        ? param.type.name.slice(5)
                                        : param.type.name.startsWith('DJS:')
                                        ? param.type.name.slice(4)
                                        : param.type.name
                                }</a>
                            </td>
                            <td style="padding:0 15px 0 15px;"> ${param.description} </td>
                        </tr>
                        `,
                            )
                            .join('')}
                      </table></div>
                      <div class="panel-body">🆘 Example:<br><pre><code class="javascript">${
                          blockComment.examples[0] ? blockComment.examples[0].value.slice(1) : 'No example provided.'
                      }</code></pre></div>
                    </div>
                    </div>
                </div>`;
                    pointer++;
                }
            });
            pageContent += '<br>';
        },
    );
    fs.writeFile('./docs/index.html', `${pageStart}${pageContent}${pageEnd}`, 'utf-8');
})();
