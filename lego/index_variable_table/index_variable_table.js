"use strict";

class indexVariableTable {

  /**
   * 构造函数
   *
   * @param outputId 传入输出的元素id
   */
  constructor(outputId) {
    this.outputId = outputId;
  }

  /**
   * 输出
   */
  output() {
    let content = 
      `<div class = "panel panel-default panel-primary">
        <div class = "panel-heading">指标参数变量对照表[全局]</div>
        <div class = "panel-body" style="padding-bottom: 0;">
          <div class = "row">
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>原有原料总量</td>
                  <td>\${g_r_m_t}</td>
                </tr>
              </table>
            </div>
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>导入原料总量</td>
                  <td>\${g_e_m_t}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class = "panel panel-default panel-primary">
        <div class = "panel-heading">指标参数变量对照表[普通值]</div>
        <div class = "panel-body" style="padding-bottom: 0;">
          <div class = "row">
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>20℃密度</td>
                  <td>\${d_20_t}</td>
                </tr>
                <tr>
                  <td>研究法辛烷值</td>
                  <td>\${r_o_n}</td>
                </tr>
                <tr>
                  <td>抗爆指数（RON+MON）/2</td>
                  <td>\${h_r_m}</td>
                </tr>
                <tr>
                  <td>铅含量</td>
                  <td>\${l_l}</td>
                </tr>
                <tr>
                  <td>铁含量</td>
                  <td>\${i_l}</td>
                </tr>
                <tr>
                  <td>锰含量</td>
                  <td>\${m_l}</td>
                </tr>
                <tr>
                  <td>馏程10%蒸发温度</td>
                  <td>\${d_r_10_e_t}</td>
                </tr>
                <tr>
                  <td>馏程50%蒸发温度</td>
                  <td>\${d_r_50_e_t}</td>
                </tr>
                <tr>
                  <td>馏程90%蒸发温度</td>
                  <td>\${d_r_90_e_t}</td>
                </tr>
                <tr>
                  <td>终馏点</td>
                  <td>\${f_b_p}</td>
                </tr>
                <tr>
                  <td>残留量</td>
                  <td>\${r_l}</td>
                </tr>
                <tr>
                  <td>蒸汽压</td>
                  <td>\${v_p}</td>
                </tr>
                <tr>
                  <td>溶剂洗胶质</td>
                  <td>\${s_w_g}</td>
                </tr>
                <tr>
                  <td>未洗胶质</td>
                  <td>\${u_g}</td>
                </tr>
                <tr>
                  <td>诱导期（氧化安定性）</td>
                  <td>\${o_s}</td>
                </tr>
                <tr>
                  <td>硫含量</td>
                  <td>\${s_l}</td>
                </tr>
                <tr>
                  <td>博士实验</td>
                  <td>\${d_t}</td>
                </tr>
                <tr>
                  <td>硫醇硫含量</td>
                  <td>\${m_s_l}</td>
                </tr>
              </table>
            </div>
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>铜片腐蚀（3h，50℃）</td>
                  <td>\${c_c_3_h_50_t}</td>
                </tr>
                <tr>
                  <td>水溶性酸或碱</td>
                  <td>\${w_s_ph}</td>
                </tr>
                <tr>
                  <td>机械杂质和水</td>
                  <td>\${m_i_w}</td>
                </tr>
                <tr>
                  <td>苯含量</td>
                  <td>\${b_l}</td>
                </tr>
                <tr>
                  <td>芳烃含量</td>
                  <td>\${a_l}</td>
                </tr>
                <tr>
                  <td>总烯烃</td>
                  <td>\$(t_a)</td>
                </tr>
                <tr>
                  <td>烯烃+芳烃</td>
                  <td>\${a_a}</td>
                </tr>
                <tr>
                  <td>氧含量</td>
                  <td>\${o_l}</td>
                </tr>
                <tr>
                  <td>甲醇</td>
                  <td>\${carbinol}</td>
                </tr>
                <tr>
                  <td>二烯值</td>
                  <td>\${d_v}</td>
                </tr>
                <tr>
                  <td>驾驶性能指数</td>
                  <td>\${d_p_i}</td>
                </tr>
                <tr>
                  <td>乙醇</td>
                  <td>\${ethanol}</td>
                </tr>
                <tr>
                  <td>硅</td>
                  <td>\${silicon}</td>
                </tr>
                <tr>
                  <td>甲基苯胺</td>
                  <td>\${methylaniline}</td>
                </tr>
                <tr>
                  <td>甲缩醛</td>
                  <td>\${formal}</td>
                </tr>
                <tr>
                  <td>硫酸二甲酯</td>
                  <td>\${d_s}</td>
                </tr>
                <tr>
                  <td>乙酸仲丁酯</td>
                  <td>\${s_b_a}</td>
                </tr>
                <tr>
                  <td>氯含量</td>
                  <td>\${c_l}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class = "panel panel-default panel-primary">
        <div class = "panel-heading">指标参数变量对照表[原始值]</div>
        <div class = "panel-body" style="padding-bottom: 0;">
          <div class = "row">
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>20℃密度</td>
                  <td>\${R_d_20_t}</td>
                </tr>
                <tr>
                  <td>研究法辛烷值</td>
                  <td>\${R_r_o_n}</td>
                </tr>
                <tr>
                  <td>抗爆指数（RON+MON）/2</td>
                  <td>\${R_h_r_m}</td>
                </tr>
                <tr>
                  <td>铅含量</td>
                  <td>\${R_l_l}</td>
                </tr>
                <tr>
                  <td>铁含量</td>
                  <td>\${R_i_l}</td>
                </tr>
                <tr>
                  <td>锰含量</td>
                  <td>\${R_m_l}</td>
                </tr>
                <tr>
                  <td>馏程10%蒸发温度</td>
                  <td>\${R_d_r_10_e_t}</td>
                </tr>
                <tr>
                  <td>馏程50%蒸发温度</td>
                  <td>\${R_d_r_50_e_t}</td>
                </tr>
                <tr>
                  <td>馏程90%蒸发温度</td>
                  <td>\${R_d_r_90_e_t}</td>
                </tr>
                <tr>
                  <td>终馏点</td>
                  <td>\${R_f_b_p}</td>
                </tr>
                <tr>
                  <td>残留量</td>
                  <td>\${R_r_l}</td>
                </tr>
                <tr>
                  <td>蒸汽压</td>
                  <td>\${R_v_p}</td>
                </tr>
                <tr>
                  <td>溶剂洗胶质</td>
                  <td>\${R_s_w_g}</td>
                </tr>
                <tr>
                  <td>未洗胶质</td>
                  <td>\${R_u_g}</td>
                </tr>
                <tr>
                  <td>诱导期（氧化安定性）</td>
                  <td>\${R_o_s}</td>
                </tr>
                <tr>
                  <td>硫含量</td>
                  <td>\${R_s_l}</td>
                </tr>
                <tr>
                  <td>博士实验</td>
                  <td>\${R_d_t}</td>
                </tr>
                <tr>
                  <td>硫醇硫含量</td>
                  <td>\${R_m_s_l}</td>
                </tr>
              </table>
            </div>
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>铜片腐蚀（3h，50℃）</td>
                  <td>\${R_c_c_3_h_50_t}</td>
                </tr>
                <tr>
                  <td>水溶性酸或碱</td>
                  <td>\${R_w_s_ph}</td>
                </tr>
                <tr>
                  <td>机械杂质和水</td>
                  <td>\${R_m_i_w}</td>
                </tr>
                <tr>
                  <td>苯含量</td>
                  <td>\${R_b_l}</td>
                </tr>
                <tr>
                  <td>芳烃含量</td>
                  <td>\${R_a_l}</td>
                </tr>
                <tr>
                  <td>总烯烃</td>
                  <td>\${R_t_a}</td>
                </tr>
                <tr>
                  <td>烯烃+芳烃</td>
                  <td>\${R_a_a}</td>
                </tr>
                <tr>
                  <td>氧含量</td>
                  <td>\${R_o_l}</td>
                </tr>
                <tr>
                  <td>甲醇</td>
                  <td>\${R_carbinol}</td>
                </tr>
                <tr>
                  <td>二烯值</td>
                  <td>\${R_d_v}</td>
                </tr>
                <tr>
                  <td>驾驶性能指数</td>
                  <td>\${R_d_p_i}</td>
                </tr>
                <tr>
                  <td>乙醇</td>
                  <td>\${R_ethanol}</td>
                </tr>
                <tr>
                  <td>硅</td>
                  <td>\${R_silicon}</td>
                </tr>
                <tr>
                  <td>甲基苯胺</td>
                  <td>\${R_methylaniline}</td>
                </tr>
                <tr>
                  <td>甲缩醛</td>
                  <td>\${R_formal}</td>
                </tr>
                <tr>
                  <td>硫酸二甲酯</td>
                  <td>\${R_d_s}</td>
                </tr>
                <tr>
                  <td>乙酸仲丁酯</td>
                  <td>\${R_s_b_a}</td>
                </tr>
                <tr>
                  <td>氯含量</td>
                  <td>\${R_c_l}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class = "panel panel-default panel-primary">
        <div class = "panel-heading">指标参数变量对照表[入库值]</div>
        <div class = "panel-body" style="padding-bottom: 0;">
          <div class = "row">
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>20℃密度</td>
                  <td>\${E_d_20_t}</td>
                </tr>
                <tr>
                  <td>研究法辛烷值</td>
                  <td>\${E_r_o_n}</td>
                </tr>
                <tr>
                  <td>抗爆指数（RON+MON）/2</td>
                  <td>\${E_h_r_m}</td>
                </tr>
                <tr>
                  <td>铅含量</td>
                  <td>\${E_l_l}</td>
                </tr>
                <tr>
                  <td>铁含量</td>
                  <td>\${E_i_l}</td>
                </tr>
                <tr>
                  <td>锰含量</td>
                  <td>\${E_m_l}</td>
                </tr>
                <tr>
                  <td>馏程10%蒸发温度</td>
                  <td>\${E_d_r_10_e_t}</td>
                </tr>
                <tr>
                  <td>馏程50%蒸发温度</td>
                  <td>\${E_d_r_50_e_t}</td>
                </tr>
                <tr>
                  <td>馏程90%蒸发温度</td>
                  <td>\${E_d_r_90_e_t}</td>
                </tr>
                <tr>
                  <td>终馏点</td>
                  <td>\${E_f_b_p}</td>
                </tr>
                <tr>
                  <td>残留量</td>
                  <td>\${E_r_l}</td>
                </tr>
                <tr>
                  <td>蒸汽压</td>
                  <td>\${E_v_p}</td>
                </tr>
                <tr>
                  <td>溶剂洗胶质</td>
                  <td>\${E_s_w_g}</td>
                </tr>
                <tr>
                  <td>未洗胶质</td>
                  <td>\${E_u_g}</td>
                </tr>
                <tr>
                  <td>诱导期（氧化安定性）</td>
                  <td>\${E_o_s}</td>
                </tr>
                <tr>
                  <td>硫含量</td>
                  <td>\${E_s_l}</td>
                </tr>
                <tr>
                  <td>博士实验</td>
                  <td>\${E_d_t}</td>
                </tr>
                <tr>
                  <td>硫醇硫含量</td>
                  <td>\${E_m_s_l}</td>
                </tr>
              </table>
            </div>
            <div class = "col-md-6">
              <table class = "table">
                <tr>
                  <td>铜片腐蚀（3h，50℃）</td>
                  <td>\${E_c_c_3_h_50_t}</td>
                </tr>
                <tr>
                  <td>水溶性酸或碱</td>
                  <td>\${E_w_s_ph}</td>
                </tr>
                <tr>
                  <td>机械杂质和水</td>
                  <td>\${E_m_i_w}</td>
                </tr>
                <tr>
                  <td>苯含量</td>
                  <td>\${E_b_l}</td>
                </tr>
                <tr>
                  <td>芳烃含量</td>
                  <td>\${E_a_l}</td>
                </tr>
                <tr>
                  <td>总烯烃</td>
                  <td>\${E_t_a}</td>
                </tr>
                <tr>
                  <td>烯烃+芳烃</td>
                  <td>\${E_a_a}</td>
                </tr>
                <tr>
                  <td>氧含量</td>
                  <td>\${E_o_l}</td>
                </tr>
                <tr>
                  <td>甲醇</td>
                  <td>\${E_carbinol}</td>
                </tr>
                <tr>
                  <td>二烯值</td>
                  <td>\${E_d_v}</td>
                </tr>
                <tr>
                  <td>驾驶性能指数</td>
                  <td>\${E_d_p_i}</td>
                </tr>
                <tr>
                  <td>乙醇</td>
                  <td>\${E_ethanol}</td>
                </tr>
                <tr>
                  <td>硅</td>
                  <td>\${E_silicon}</td>
                </tr>
                <tr>
                  <td>甲基苯胺</td>
                  <td>\${E_methylaniline}</td>
                </tr>
                <tr>
                  <td>甲缩醛</td>
                  <td>\${E_formal}</td>
                </tr>
                <tr>
                  <td>硫酸二甲酯</td>
                  <td>\${E_d_s}</td>
                </tr>
                <tr>
                  <td>乙酸仲丁酯</td>
                  <td>\${E_s_b_a}</td>
                </tr>
                <tr>
                  <td>氯含量</td>
                  <td>\${E_c_l}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>`;
    $(this.outputId).html(content);
  }
}
