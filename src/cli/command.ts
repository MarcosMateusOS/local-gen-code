import yargs from "yargs";
import { hideBin } from "yargs/helpers"
import { codeGenerate } from "../code-gen/ai";

yargs(hideBin(process.argv))
    .command(
        "generate [PROMPT]",
        "code generate",
        (yargs) => {
            return yargs
                .positional("PROMPT", {
                    describe: "code generate",
                    default: "Generate a simple example of html page"
                })
        },
        async (argv) => {

            const prompt = argv.PROMPT ?? "Generate a simple example of html page"
            await codeGenerate(prompt, 'CLU')
        }
    ).option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    }).parse()