let env;

module.exports = (

    process.env.NODE_ENV = env = ([

        "production",
        "development",
        "test"

    ].includes(process.argv[2]) ?

        process.argv[2]
    :
        process.env.NODE_ENV || "development"
    )
);

process.env.NPM_CONFIG_LOGLEVEL = "error";
process.env.NPM_CONFIG_ENV = env;
process.env.NODE_MODULES_CACHE = env === "production";
process.env.NODE_VERBOSE = env !== "production";