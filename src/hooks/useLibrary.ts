import { loadSongs } from "@/lib/songs";
import { createExternalState } from "@/lib/store";

export const [useLibrary, properegateLibraryUpdate] = createExternalState(() => loadSongs() );
