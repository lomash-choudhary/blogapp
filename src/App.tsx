import config from "./config/config"

function App() {

  console.log(config.appwriteUrl)

  return (
    <>
      <div className="bg-red-500">
        Hi there
      </div>
    </>
  )
}

export default App
