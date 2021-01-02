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
    length: number
    start: number
    pitch: Pitch
}

class Sequence {
    notes: Note[] = []


    
    
}

export { Pitch, Note, Sequence }