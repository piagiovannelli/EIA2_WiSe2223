namespace shoppinglistA04 {


    export interface Input {
        savedItem: string;
        savedAmount: number;
        savedComment: string;
        savedDate: string;
        savedPurchase: boolean;
    }



    export let savedInputs: Input[] = [

        {
            savedItem: "Müsli",
            savedAmount: 1,
            savedComment: "Alnatura",
            savedDate: "03.11.2022",
            savedPurchase: false

        },
        {
            savedItem: "Äpfel",
            savedAmount: 4,
            savedComment: "Pink Lady",
            savedDate: "01.11.2022",
            savedPurchase: true
        },
        
    ];

    export let savedItem: string = "";

}