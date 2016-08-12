export default function transitionTypeReducer(state, action) {
    switch(action.type) {
        default: return state || {
            array: [1, 2],
            entities: {
                1: { 
                    name: "Completion",
                    variables: [
                        {
                            name: "Name",
                            type: "string",
                        },
                    ]
                },
                2: {
                    name: "Timeout",
                    variables: [
                        {
                            name: "Name",
                            type: "string",
                        },
                        {
                            name: "Duration",
                            type: "time"
                        }
                    ]
                }
            }
        }
    }
}
