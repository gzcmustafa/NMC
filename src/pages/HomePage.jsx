import logo from "../assets/logo.jpeg"; // Dosya konumuna göre import et

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center ">
        <div className="flex items-center">
          <img className="w-[60px]" src={logo} alt="" />
          NMC
        </div>
        <div className="flex gap-2 flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            className="  border py-2 px-4 text-m text-gray-500  focus:outline-blue-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="  border py-2 px-4 text-m text-gray-500  focus:outline-blue-700"
          />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}
