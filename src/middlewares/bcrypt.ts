import bcrypt from 'bcrypt';

export class bcypt {

    async encriptar(word: string) {
        const salt = await bcrypt.genSalt(10)
        const h = await bcrypt.hash(word, salt)
        return h;
    }

    async login(contrasena: string, compContraseña: string): Promise<boolean> {

        const verificacion: boolean = await bcrypt.compare(contrasena, compContraseña);
        return verificacion;
    }
}