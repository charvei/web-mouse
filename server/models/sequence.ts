enum Pitch {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G"
}

//frequency should be part of notes at some point
class Note {
    duration: String    //  "1n" | "2n" | "4n" | "8n" | "16n"
    time: String        //  "0:2:2" = first measure + 2 quarter notes + 2 sixteenth notes
    pitch: String        //  "A5, Ab3, G6"
    //velocity: number
}

class Sequence {
    notes: Note[] = []


    
    
}

export { Pitch, Note, Sequence }