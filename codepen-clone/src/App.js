import './App.css';
import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'
function App() {
  const [html,setHtml]=useLocalStorage('html',"")
  const [css,setCss]=useLocalStorage('css',"")
  const [javascript,setJavascript]=useLocalStorage('javascript',"")
  const srcDark =`
  <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
  </html>
`
  return (
    <>
      <div className="pane top-pane" >
        <Editor  language='xml' displayName="HTML" value={html} onChange={setHtml} />
        <Editor  language='css' displayName="CSS" value={css} onChange={setCss} />
        <Editor  language='javascript' displayName="JS" value={javascript} onChange={setJavascript} />
      </div>
      <div className="pane">
          <iframe srcDoc={srcDark} title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%" />
      </div>
    </>
  );
}

export default App;
