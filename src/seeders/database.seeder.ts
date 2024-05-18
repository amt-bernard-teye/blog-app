import { UserSeeder } from "./user.seeder";

export class DatabaseSeeder {
    static async run() {
        await UserSeeder.run();
    }
}